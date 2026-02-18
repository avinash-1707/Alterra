import { GoogleGenAI } from "@google/genai";
import { UploadApiResponse } from "cloudinary";
import cloudinary from "@/lib/cloudinary";

// ─── Types ────────────────────────────────────────────────────────────────────

type SupportedMimeType =
  | "image/png"
  | "image/jpeg"
  | "image/webp"
  | "image/gif"
  | "image/heic"
  | "image/heif";

interface ReferenceImage {
  /** Base64-encoded image data */
  base64: string;
  /** MIME type of the reference image */
  mimeType: SupportedMimeType;
}

interface GenerateImageOptions {
  /** The text prompt describing the image to generate */
  prompt: string;
  /** Optional reference image in base64 + mimeType format */
  referenceImage?: ReferenceImage;
  /** Optional Cloudinary folder to upload into (default: "ai-generated") */
  cloudinaryFolder?: string;
  /** Optional Cloudinary public_id for the uploaded asset */
  cloudinaryPublicId?: string;
}

interface GenerateImageResult {
  /** The full Cloudinary URL of the uploaded image */
  url: string;
  /** The secure HTTPS Cloudinary URL */
  secureUrl: string;
  /** Cloudinary public ID — use this to transform or delete later */
  publicId: string;
  /** Any text response returned alongside the image by Gemini */
  textResponse: string | null;
  /** Whether a reference image was used */
  usedReferenceImage: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const IMAGE_MODEL = "gemini-2.5-flash-image";

// ─── Core Function ────────────────────────────────────────────────────────────

/**
 * Generates an image via Gemini and uploads it to Cloudinary.
 * Accepts an optional reference image as base64 + mimeType.
 * Returns the Cloudinary URL — no local file system writes.
 *
 * @example
 * // Text-to-image
 * const { secureUrl } = await generateImage({
 *   prompt: "A glowing lamp on a mahogany desk",
 * });
 *
 * @example
 * // Image-to-image
 * const { secureUrl } = await generateImage({
 *   prompt: "My cat in a fancy restaurant",
 *   referenceImage: { base64: "...", mimeType: "image/png" },
 * });
 */
export async function generateImage(
  options: GenerateImageOptions,
): Promise<GenerateImageResult> {
  const {
    prompt,
    referenceImage,
    cloudinaryFolder = "ai-generated",
    cloudinaryPublicId,
  } = options;

  // ── Validate ───────────────────────────────────────────────────────────────
  if (!prompt?.trim()) {
    throw new Error("A non-empty prompt is required.");
  }

  if (referenceImage) {
    if (!referenceImage.base64?.trim()) {
      throw new Error("referenceImage.base64 cannot be empty.");
    }
    if (!referenceImage.mimeType?.trim()) {
      throw new Error("referenceImage.mimeType cannot be empty.");
    }
  }

  // ── Build Gemini contents payload ──────────────────────────────────────────
  const contents: object[] = [{ text: prompt.trim() }];
  const usedReferenceImage = Boolean(referenceImage);

  if (referenceImage) {
    contents.push({
      inlineData: {
        mimeType: referenceImage.mimeType,
        data: referenceImage.base64,
      },
    });
  }

  // ── Call Gemini ────────────────────────────────────────────────────────────
  const ai = new GoogleGenAI({});

  let response: Awaited<ReturnType<typeof ai.models.generateContent>>;
  try {
    response = await ai.models.generateContent({
      model: IMAGE_MODEL,
      contents,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Gemini API call failed: ${message}`);
  }

  // ── Parse Gemini response ──────────────────────────────────────────────────
  const parts = response.candidates?.[0]?.content?.parts;
  if (!parts || parts.length === 0) {
    throw new Error(
      "No content returned from Gemini. The model may have refused the request.",
    );
  }

  let textResponse: string | null = null;
  let imageBase64: string | null = null;
  let imageMimeType: string = "image/png";

  for (const part of parts) {
    if (part.text) {
      textResponse = part.text;
    } else if (part.inlineData?.data) {
      imageBase64 = part.inlineData.data;
      imageMimeType = part.inlineData.mimeType ?? "image/png";
    }
  }

  if (!imageBase64) {
    const refusal = textResponse
      ? `Model response: "${textResponse}"`
      : "No explanation provided.";
    throw new Error(`No image was returned by the model. ${refusal}`);
  }

  // ── Upload to Cloudinary ───────────────────────────────────────────────────
  const dataUri = `data:${imageMimeType};base64,${imageBase64}`;

  let uploadResult: UploadApiResponse;
  try {
    uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: cloudinaryFolder,
      ...(cloudinaryPublicId && { public_id: cloudinaryPublicId }),
      resource_type: "image",
      overwrite: true,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Cloudinary upload failed: ${message}`);
  }

  // ── Return ─────────────────────────────────────────────────────────────────
  return {
    url: uploadResult.url,
    secureUrl: uploadResult.secure_url,
    publicId: uploadResult.public_id,
    textResponse,
    usedReferenceImage,
  };
}

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authClient } from "@/lib/server-auth-client";
import { enhancePrompt } from "@/utils/ai/enhancePrompt";
import { generateImage } from "@/utils/ai/generateImage";
import { images } from "@/db/schemas/image";
import { contexts } from "@/db";
import { and, eq } from "drizzle-orm";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SUPPORTED_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/heic",
  "image/heif",
]);

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

async function fileToBase64(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  return Buffer.from(buffer).toString("base64");
}

// ─── POST /api/v1/images/generate ────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  const session = await authClient.getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  // ── Parse FormData ─────────────────────────────────────────────────────────
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const rawPrompt = (formData.get("prompt") as string | null)?.trim() ?? "";
  const smartExpansionRaw = formData.get("smartExpansion");
  const smartExpansion = smartExpansionRaw === "true";
  const contextId =
    (formData.get("contextId") as string | null)?.trim() ?? null;
  const imageFile = formData.get("image") as File | null;

  // ── Validate ───────────────────────────────────────────────────────────────
  if (!rawPrompt && !imageFile) {
    return NextResponse.json(
      { error: "A prompt or reference image is required." },
      { status: 400 },
    );
  }

  if (imageFile) {
    if (!SUPPORTED_TYPES.has(imageFile.type)) {
      return NextResponse.json(
        {
          error: `Unsupported image type: ${imageFile.type}. Supported: png, jpeg, webp, gif, heic, heif.`,
        },
        { status: 400 },
      );
    }
    if (imageFile.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Reference image exceeds the 10 MB size limit." },
        { status: 400 },
      );
    }
  }

  // ── Optionally fetch context ───────────────────────────────────────────────
  let contextText: string | null = null;

  if (contextId) {
    try {
      const [context] = await db
        .select()
        .from(contexts)
        .where(and(eq(contexts.id, contextId)))
        .limit(1);

      contextText = context?.structuredData?.toString() ?? null;
    } catch (error) {
      console.error(`[generate] Failed to fetch context ${contextId}:`, error);
      // Non-fatal — we can still generate without the context
    }
  }

  // ── Build final prompt ─────────────────────────────────────────────────────
  let finalPrompt = rawPrompt;

  if (smartExpansion && rawPrompt) {
    try {
      finalPrompt = await enhancePrompt(rawPrompt);
    } catch (err) {
      console.error("[generate] enhancePrompt failed, using raw prompt:", err);
      // Fall back to raw prompt — non-fatal
    }
  }

  if (contextText) {
    finalPrompt =
      `${finalPrompt}\n\nAdditional context:\n${contextText}`.trim();
  }

  if (!finalPrompt) {
    return NextResponse.json(
      { error: "Could not build a valid prompt." },
      { status: 400 },
    );
  }

  // ── Convert reference image ────────────────────────────────────────────────
  let referenceImage: { base64: string; mimeType: string } | undefined =
    undefined;

  if (imageFile) {
    const base64 = await fileToBase64(imageFile);
    referenceImage = { base64, mimeType: imageFile.type };
  }

  // ── Generate image ─────────────────────────────────────────────────────────
  let generationResult: Awaited<ReturnType<typeof generateImage>>;
  try {
    generationResult = await generateImage({
      prompt: finalPrompt,
      // @ts-expect-error mimeType is validated above
      referenceImage,
      cloudinaryFolder: "ai-generated",
    });
  } catch (err) {
    console.error("[generate] generateImage failed:", err);
    const message =
      err instanceof Error ? err.message : "Image generation failed.";

    // Persist FAILED record
    await db
      .insert(images)
      .values({
        userId,
        originalUrl: "",
        prompt: finalPrompt,
        modelUsed: "gemini-2.5-flash-image",
        status: "FAILED",
        processingTimeMs: Date.now() - startTime,
        metadata: { error: message, smartExpansion, contextId },
      })
      .catch((dbErr) =>
        console.error("[generate] failed to save FAILED record:", dbErr),
      );

    return NextResponse.json({ error: message }, { status: 502 });
  }

  const processingTimeMs = Date.now() - startTime;

  // ── Persist COMPLETED record ───────────────────────────────────────────────
  let savedRecord: typeof images.$inferSelect | null = null;
  try {
    const [record] = await db
      .insert(images)
      .values({
        userId,
        originalUrl: generationResult.secureUrl,
        prompt: finalPrompt,
        modelUsed: "gemini-2.5-flash-image",
        status: "COMPLETED",
        processingTimeMs,
        metadata: {
          publicId: generationResult.publicId,
          textResponse: generationResult.textResponse,
          usedReferenceImage: generationResult.usedReferenceImage,
          smartExpansion,
          rawPrompt,
          contextId,
        },
      })
      .returning();

    savedRecord = record ?? null;
  } catch (dbErr) {
    // Image was generated but DB write failed — still return the URL
    console.error("[generate] DB insert failed:", dbErr);
  }

  // ── Respond ────────────────────────────────────────────────────────────────
  return NextResponse.json(
    {
      imageUrl: generationResult.secureUrl,
      publicId: generationResult.publicId,
      imageId: savedRecord?.id ?? null,
      prompt: finalPrompt,
      processingTimeMs,
    },
    { status: 201 },
  );
}

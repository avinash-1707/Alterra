import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export interface ExtractedContextInterface {
  name: string;
  structuredData: {
    subject: string;
    environment: string;
    lighting: string;
    colorPalette: string[];
    camera: string;
    composition: string;
    mood: string;
    style: string;
    materials: string;
    era: string;
    renderType: string;
  };
  aiPromptBlock: string;
  tags: string[];
}

export async function extractImageContext(
  imageBase64: string,
  mimeType: string,
): Promise<ExtractedContextInterface> {
  if (!imageBase64 || !mimeType) {
    throw new Error("Image data and MIME type are required");
  }

  // Validate MIME type
  const validMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!validMimeTypes.includes(mimeType)) {
    throw new Error(`Unsupported MIME type: ${mimeType}`);
  }

  const contents = [
    {
      inlineData: {
        mimeType,
        data: imageBase64,
      },
    },
    {
      text: `
You are an AI vision system designed to extract reusable artistic context from images.

Analyze this image deeply and extract ALL reusable visual context.

Return ONLY valid JSON in this exact format:

{
  "name": "short reusable style name",
  "structuredData": {
    "subject": "",
    "environment": "",
    "lighting": "",
    "colorPalette": [],
    "camera": "",
    "composition": "",
    "mood": "",
    "style": "",
    "materials": "",
    "era": "",
    "renderType": ""
  },
  "aiPromptBlock": "concise reusable AI prompt block",
  "tags": []
}

Rules:
- Be detailed but structured.
- Extract lighting direction, lens type, composition framing.
- Tags must be short keywords.
- No explanation.
- Only JSON.
`,
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents,
  });

  const rawText = response.text;

  if (!rawText) {
    console.error("Gemini response missing text content:", response);
    throw new Error("Gemini did not return any text content");
  }

  // Clean potential markdown wrapping
  const cleaned = rawText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    const parsed = JSON.parse(cleaned);

    // Validate the structure
    if (
      !parsed.name ||
      !parsed.structuredData ||
      !parsed.aiPromptBlock ||
      !parsed.tags
    ) {
      throw new Error("Invalid response structure from Gemini");
    }

    return parsed as ExtractedContextInterface;
  } catch (err) {
    console.error("Gemini raw response:", rawText);
    console.error("Parse error:", err);
    throw new Error("Gemini returned invalid JSON");
  }
}

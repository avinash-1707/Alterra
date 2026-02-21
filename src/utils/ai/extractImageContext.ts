import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export interface ExtractedContextInterface {
  name: string;
  structuredData: {
    imageType:
      | "photograph"
      | "screenshot"
      | "artwork"
      | "diagram"
      | "document"
      | "ui"
      | "other";
    subject: string;
    mood: string;
    colorPalette: string[];
    style: string;
    tags: string[];

    environment?: string;
    lighting?: string;
    camera?: string;
    composition?: string;
    materials?: string;
    era?: string;
    renderType?: string;

    layout?: string;
    uiComponents?: string[];
    typography?: string;
    brandingElements?: string;
    contentType?: string;
    interactiveElements?: string[];

    person?: {
      estimatedAge?: string;
      expression?: string;
      attire?: string;
      context?: string;
    };
  };
  summary: string;
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
You are a universal image context extractor. Your job is to analyze ANY kind of image — including photographs of people or objects, website screenshots, UI mockups, artworks, diagrams, documents, or anything else — and extract structured, reusable context from it.

Step 1: Identify what type of image this is.
Step 2: Extract ALL relevant context based on what you see, filling in only the fields that apply.

Return ONLY valid JSON in this exact format — no explanation, no markdown, no extra text:

{
  "name": "short descriptive style or scene name (3-6 words)",
  "structuredData": {
    "imageType": "one of: photograph | screenshot | artwork | diagram | document | ui | other",
    "subject": "What is the primary subject? (person, product, webpage, chart, etc.)",
    "mood": "Overall emotional tone or feel",
    "colorPalette": ["dominant hex or color names, up to 6"],
    "style": "Visual style (e.g. minimalist, photorealistic, flat design, editorial, corporate, etc.)",

    "environment": "For photos/scenes: indoor/outdoor setting. Leave empty string if not applicable.",
    "lighting": "For photos/scenes: lighting type and direction. Leave empty string if not applicable.",
    "camera": "For photos: lens type, angle, depth of field. Leave empty string if not applicable.",
    "composition": "For photos/art: framing, rule of thirds, symmetry, etc. Leave empty string if not applicable.",
    "materials": "For product/object photos: textures and materials. Leave empty string if not applicable.",
    "era": "Time period or decade if relevant. Leave empty string if not applicable.",
    "renderType": "For art/3D: render engine or technique. Leave empty string if not applicable.",

    "layout": "For UI/screenshots: layout structure (grid, sidebar, hero, etc.). Leave empty string if not applicable.",
    "uiComponents": ["For UI/screenshots: list of UI elements visible (navbar, modal, card, form, etc.). Empty array if not applicable."],
    "typography": "For UI/screenshots/documents: font styles and hierarchy observed. Leave empty string if not applicable.",
    "brandingElements": "For UI/screenshots: logos, brand colors, design system hints. Leave empty string if not applicable.",
    "contentType": "For screenshots/documents: what kind of content (e-commerce, blog, dashboard, landing page, etc.). Leave empty string if not applicable.",
    "interactiveElements": ["For UI: buttons, inputs, sliders, dropdowns visible. Empty array if not applicable."],

    "person": {
      "estimatedAge": "Age range if a person is present. Leave empty string if not applicable.",
      "expression": "Facial expression or body language. Leave empty string if not applicable.",
      "attire": "Clothing style. Leave empty string if not applicable.",
      "context": "What is the person doing or where are they. Leave empty string if not applicable."
    },

    "tags": ["10-15 short keyword tags describing the image"]
  },
  "summary": "2-3 sentence plain-English description of what this image is and what it contains.",
  "aiPromptBlock": "A concise, reusable prompt block an AI image generator could use to recreate the visual style, tone, and composition of this image.",
  "tags": ["10-15 short keyword tags — same as structuredData.tags"]
}

Rules:
- Fill ALL fields. Use empty string "" or empty array [] for fields that don't apply.
- Never skip the person object — use empty strings inside if no person is present.
- Be specific and descriptive, not generic.
- colorPalette should list actual color names or hex codes you observe.
- aiPromptBlock should be a dense, comma-separated style descriptor useful for image generation.
- Only return JSON. Nothing else.
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

  const cleaned = rawText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    const parsed = JSON.parse(cleaned);

    if (
      !parsed.name ||
      !parsed.structuredData ||
      !parsed.structuredData.imageType ||
      !parsed.summary ||
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

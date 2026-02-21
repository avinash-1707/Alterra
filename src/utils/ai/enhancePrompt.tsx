import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

/**
 * Enhances a raw user prompt into a detailed, structured image generation prompt.
 * @param rawPrompt - The simple user-provided prompt
 * @returns A richly detailed prompt optimized for image generation models
 */
export async function enhancePrompt(rawPrompt: string): Promise<string> {
  if (!rawPrompt || rawPrompt.trim().length === 0) {
    throw new Error("Prompt cannot be empty");
  }

  const systemInstruction = `You are an expert prompt engineer specializing in AI image generation. 
Your sole job is to transform simple user prompts into rich, detailed image generation prompts.

Follow these enhancement principles:
1. **Subject**: Clarify and enrich the main subject with specific details
2. **Style**: Add artistic style (photorealistic, cinematic, illustrated, etc.)
3. **Lighting**: Specify lighting conditions (golden hour, studio softbox, dramatic side lighting, etc.)
4. **Composition**: Define camera angle, framing, depth of field
5. **Environment**: Add background, setting, atmosphere
6. **Quality modifiers**: Include technical quality terms (8K, ultra-detailed, sharp focus, etc.)
7. **Mood/Tone**: Convey the emotional feel of the image

Rules:
- Output ONLY the enhanced prompt — no explanations, no preamble, no labels
- Keep it under 200 words
- Make it vivid and specific, not generic
- Preserve the original intent of the user's request`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Enhance this image generation prompt: "${rawPrompt.trim()}"`,
    config: {
      systemInstruction,
      temperature: 0.7,
      maxOutputTokens: 300,
    },
  });

  const enhanced = response.text?.trim();

  console.log(enhanced);

  if (!enhanced) {
    throw new Error(
      "Failed to generate enhanced prompt — empty response from model",
    );
  }

  return enhanced;
}

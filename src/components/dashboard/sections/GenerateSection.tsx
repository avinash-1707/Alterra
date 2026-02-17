"use client";

import { useState } from "react";
import GenerateHero from "../generate/GenerateHero";
import PromptCard from "../generate/PromptCard";
import CreditEstimate from "../generate/CreditEstimate";
import ExamplePrompts from "../generate/ExamplePrompts";
import GeneratedResult from "../generate/GeneratedResult";
import ContextPickerModal from "../generate/ContextPickerModal";
import RetryModal from "../generate/RetryModal";

export type GenerationState = "idle" | "generating" | "done";

export interface AttachedImage {
  file: File;
  previewUrl: string;
}

export interface SavedContext {
  id: string;
  name: string;
  description: string;
  keywords: string[];
}

const MOCK_CONTEXTS: SavedContext[] = [
  {
    id: "1",
    name: "Cyberpunk Character",
    description:
      "Neon-lit futuristic character with chrome implants, purple hair",
    keywords: ["cyberpunk", "neon", "futuristic"],
  },
  {
    id: "2",
    name: "Mountain Landscape",
    description:
      "Misty mountain peaks at sunrise, dramatic golden hour lighting",
    keywords: ["landscape", "mountains", "sunrise"],
  },
  {
    id: "3",
    name: "Abstract Geometry",
    description: "Clean geometric shapes with gradient colors, minimalist",
    keywords: ["abstract", "geometric", "minimal"],
  },
];

export default function GenerateSection() {
  const [prompt, setPrompt] = useState("");
  const [smartExpansion, setSmartExpansion] = useState(false);
  const [attachedImage, setAttachedImage] = useState<AttachedImage | null>(
    null,
  );
  const [selectedContext, setSelectedContext] = useState<SavedContext | null>(
    null,
  );
  const [generationState, setGenerationState] =
    useState<GenerationState>("idle");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null,
  );
  const [showContextModal, setShowContextModal] = useState(false);
  const [showRetryModal, setShowRetryModal] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() && !attachedImage) return;
    setGenerationState("generating");

    // Fake API call
    await new Promise((r) => setTimeout(r, 3000));

    // Use a placeholder gradient image as the "generated" result
    setGeneratedImageUrl(
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1024&q=80",
    );
    setGenerationState("done");
  };

  const handleRetry = () => setShowRetryModal(true);

  const handleRetryConfirm = async (editContext: boolean) => {
    setShowRetryModal(false);
    if (editContext) {
      setShowContextModal(true);
    } else {
      setGenerationState("idle");
      setGeneratedImageUrl(null);
      await handleGenerate();
    }
  };

  const handleSave = () => {
    // Save logic placeholder
    alert("Image saved to gallery!");
  };

  const handleExampleSelect = (text: string) => {
    setPrompt(text);
  };

  const handleContextSelect = (context: SavedContext) => {
    setSelectedContext(context);
    setShowContextModal(false);
  };

  const resetToIdle = () => {
    setGenerationState("idle");
    setGeneratedImageUrl(null);
  };

  return (
    <div className="min-h-full w-full max-w-3xl mx-auto px-4 py-10 space-y-6">
      {/* Heading */}
      <GenerateHero />

      {/* Main Prompt Card */}
      <PromptCard
        prompt={prompt}
        setPrompt={setPrompt}
        smartExpansion={smartExpansion}
        setSmartExpansion={setSmartExpansion}
        attachedImage={attachedImage}
        setAttachedImage={setAttachedImage}
        selectedContext={selectedContext}
        setSelectedContext={setSelectedContext}
        generationState={generationState}
        onGenerate={handleGenerate}
        onOpenContextModal={() => setShowContextModal(true)}
      />

      {/* Credit Estimate */}
      <CreditEstimate
        smartExpansion={smartExpansion}
        hasImage={!!attachedImage}
        hasContext={!!selectedContext}
      />

      {/* Example Prompts or Generated Result */}
      {generationState === "idle" && !generatedImageUrl && (
        <ExamplePrompts onSelect={handleExampleSelect} />
      )}

      {(generationState === "generating" || generationState === "done") && (
        <GeneratedResult
          generationState={generationState}
          imageUrl={generatedImageUrl}
          onRetry={handleRetry}
          onSave={handleSave}
        />
      )}

      {/* Context Picker Modal */}
      {showContextModal && (
        <ContextPickerModal
          contexts={MOCK_CONTEXTS}
          selected={selectedContext}
          onSelect={handleContextSelect}
          onClose={() => setShowContextModal(false)}
        />
      )}

      {/* Retry Modal */}
      {showRetryModal && (
        <RetryModal
          onConfirm={handleRetryConfirm}
          onClose={() => setShowRetryModal(false)}
        />
      )}
    </div>
  );
}

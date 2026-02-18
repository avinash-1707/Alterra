"use client";

import { useState } from "react";
import { useContexts } from "@/hooks/useContexts";
import { Context } from "@/types/context";
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

export default function GenerateSection() {
  const [prompt, setPrompt] = useState("");
  const [smartExpansion, setSmartExpansion] = useState(false);
  const [attachedImage, setAttachedImage] = useState<AttachedImage | null>(
    null,
  );
  const [selectedContext, setSelectedContext] = useState<Context | null>(null);
  const [generationState, setGenerationState] =
    useState<GenerationState>("idle");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null,
  );
  const [showContextModal, setShowContextModal] = useState(false);
  const [showRetryModal, setShowRetryModal] = useState(false);
  const { data: contextsData } = useContexts({
    page: 1,
    limit: 100,
    sortOrder: "desc",
  });
  const availableContexts = contextsData?.data ?? [];

  const handleGenerate = async () => {
    if (!prompt.trim() && !attachedImage) return;

    setGenerationState("generating");

    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("smartExpansion", String(smartExpansion));

    if (attachedImage) {
      formData.append("image", attachedImage.file);
    }

    if (selectedContext) {
      formData.append("contextId", selectedContext.id);
    }

    const res = await fetch("/api/v1/images/generate", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setGeneratedImageUrl(data.imageUrl);
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

  const handleContextSelect = (context: Context) => {
    setSelectedContext(context);
    setShowContextModal(false);
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
          contexts={availableContexts}
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

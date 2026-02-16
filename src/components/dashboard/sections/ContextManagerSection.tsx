"use client";

import { useState } from "react";
import GlassCard from "@/components/common/GlassCard";
import ContextUpload from "../context-manager/ContextUpload";
import ExtractedContext from "../context-manager/ExtractedContext";
import SavedContexts from "../context-manager/SavedContexts";
import ContextModal from "../context-manager/ContextModal";
interface Context {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  createdAt: Date;
  imageUrl?: string;
}

export default function ContextManager() {
  const [extractedContext, setExtractedContext] = useState<Context | null>(
    null,
  );
  const [selectedContext, setSelectedContext] = useState<Context | null>(null);
  const [savedContexts, setSavedContexts] = useState<Context[]>([
    {
      id: "1",
      name: "Cyberpunk Character",
      description:
        "Neon-lit futuristic character with chrome implants, purple hair, wearing tech-enhanced jacket",
      keywords: ["cyberpunk", "neon", "character", "futuristic", "chrome"],
      createdAt: new Date("2024-02-10"),
    },
    {
      id: "2",
      name: "Mountain Landscape",
      description:
        "Misty mountain peaks at sunrise, dramatic lighting, golden hour atmosphere",
      keywords: ["landscape", "mountains", "sunrise", "atmospheric", "nature"],
      createdAt: new Date("2024-02-12"),
    },
    {
      id: "3",
      name: "Abstract Geometry",
      description:
        "Clean geometric shapes with gradient colors, minimalist composition",
      keywords: ["abstract", "geometric", "minimal", "gradient", "modern"],
      createdAt: new Date("2024-02-15"),
    },
  ]);

  const handleExtractContext = async (file: File) => {
    // Simulate API call to extract context
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock extracted context
    const mockContext: Context = {
      id: Date.now().toString(),
      name: file.name.replace(/\.[^/.]+$/, ""),
      description:
        "A detailed scene featuring dramatic lighting, cinematic composition with vibrant colors and intricate details",
      keywords: ["dramatic", "cinematic", "vibrant", "detailed", "atmospheric"],
      createdAt: new Date(),
      imageUrl: URL.createObjectURL(file),
    };

    setExtractedContext(mockContext);
  };

  const handleSaveContext = (context: Context) => {
    setSavedContexts([context, ...savedContexts]);
    setExtractedContext(null);
  };

  const handleDeleteContext = (id: string) => {
    setSavedContexts(savedContexts.filter((ctx) => ctx.id !== id));
    if (selectedContext?.id === id) {
      setSelectedContext(null);
    }
  };

  const handleContextClick = (context: Context) => {
    setSelectedContext(context);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-4xl md:text-5xl font-bold mb-3">context manager</h2>
        <p className="text-lg text-zinc-400">
          Upload, organize, and version context data used during generation.
        </p>
      </div>

      {/* Upload Section */}
      <GlassCard>
        <div className="p-8">
          <ContextUpload onExtract={handleExtractContext} />

          {extractedContext && (
            <ExtractedContext
              context={extractedContext}
              onSave={handleSaveContext}
              onDiscard={() => setExtractedContext(null)}
            />
          )}
        </div>
      </GlassCard>

      {/* Saved Contexts */}
      <SavedContexts
        contexts={savedContexts}
        onContextClick={handleContextClick}
        onDelete={handleDeleteContext}
      />

      {/* Context Modal */}
      {selectedContext && (
        <ContextModal
          context={selectedContext}
          onClose={() => setSelectedContext(null)}
        />
      )}
    </div>
  );
}

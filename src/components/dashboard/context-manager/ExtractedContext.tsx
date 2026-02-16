"use client";

import { CreateContextDTO } from "@/types/context";
import { useState, useEffect } from "react";

interface ExtractedContextProps {
  context: CreateContextDTO;
  onSave: (context: CreateContextDTO) => void;
  onDiscard: () => void;
}

export default function ExtractedContext({
  context,
  onSave,
  onDiscard,
}: ExtractedContextProps) {
  const [editableContext, setEditableContext] =
    useState<CreateContextDTO>(context);
  const [selectedLines, setSelectedLines] = useState<Set<string>>(new Set());
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setEditableContext(context);
    setSelectedLines(new Set()); // Reset selections when new context arrives
  }, [context]);

  const jsonString = JSON.stringify(editableContext, null, 2);
  const lines = jsonString.split("\n");

  const toggleLine = (lineIndex: number) => {
    const newSelected = new Set(selectedLines);
    const key = `line-${lineIndex}`;

    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }

    setSelectedLines(newSelected);
  };

  const handleLineEdit = (lineIndex: number, newValue: string) => {
    const newLines = [...lines];
    newLines[lineIndex] = newValue;

    try {
      const newJson = JSON.parse(newLines.join("\n"));
      setEditableContext(newJson);
    } catch (error) {
      // Invalid JSON, don't update
      console.error("Invalid JSON - edit not applied");
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(editableContext);
    } catch (error) {
      console.error("Failed to save context:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-8 pt-8 border-t border-zinc-800/50">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <h3 className="text-xl font-bold text-white">Extracted Context</h3>
        </div>
        <p className="text-sm text-zinc-400">
          Review and edit the extracted context. Click checkboxes to enable
          editing specific lines.
        </p>
      </div>

      <div className="space-y-6">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4">
            <div className="text-xs text-zinc-500 mb-1">Name</div>
            <div className="text-sm text-white font-medium truncate">
              {editableContext.name}
            </div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4">
            <div className="text-xs text-zinc-500 mb-1">Tags</div>
            <div className="text-sm text-white font-medium">
              {editableContext.tags?.length || 0} tag
              {editableContext.tags?.length !== 1 ? "s" : ""}
            </div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4">
            <div className="text-xs text-zinc-500 mb-1">Model</div>
            <div className="text-sm text-white font-medium">
              {editableContext.model || "Not specified"}
            </div>
          </div>
        </div>

        {/* JSON Editor */}
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl overflow-hidden">
          <div className="bg-zinc-950/50 px-4 py-2 border-b border-zinc-800/50 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">JSON Editor</span>
            {selectedLines.size > 0 && (
              <span className="text-xs text-orange-400">
                {selectedLines.size} line{selectedLines.size !== 1 ? "s" : ""}{" "}
                selected
              </span>
            )}
          </div>
          <div className="p-4 max-h-96 overflow-y-auto">
            <div className="font-mono text-sm">
              {lines.map((line, index) => {
                const lineKey = `line-${index}`;
                const isSelected = selectedLines.has(lineKey);

                return (
                  <div
                    key={index}
                    className="flex items-start gap-2 hover:bg-zinc-800/30 group rounded px-1 -mx-1"
                  >
                    {/* Checkbox */}
                    <label className="flex items-center pt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleLine(index)}
                        className="w-3 h-3 rounded border-zinc-600 bg-zinc-800 text-orange-500 focus:ring-orange-500 focus:ring-offset-0 cursor-pointer"
                      />
                    </label>

                    {/* Line Content */}
                    <div className="flex-1 min-w-0">
                      {isSelected ? (
                        <input
                          type="text"
                          value={line}
                          onChange={(e) =>
                            handleLineEdit(index, e.target.value)
                          }
                          className="w-full bg-zinc-800 text-orange-300 px-2 py-0.5 rounded border border-orange-500/30 focus:outline-none focus:border-orange-500 font-mono text-sm"
                        />
                      ) : (
                        <pre className="text-zinc-300 whitespace-pre overflow-x-auto">
                          {line}
                        </pre>
                      )}
                    </div>

                    {/* Line Number */}
                    <span className="text-zinc-600 text-xs pt-1 opacity-0 group-hover:opacity-100 transition-opacity tabular-nums">
                      {index + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AI Prompt Block Preview */}
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl overflow-hidden">
          <div className="bg-zinc-950/50 px-4 py-2 border-b border-zinc-800/50">
            <span className="text-xs font-mono text-zinc-400">
              AI Prompt Block
            </span>
          </div>
          <div className="p-4 max-h-48 overflow-y-auto">
            <p className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">
              {editableContext.aiPromptBlock}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 px-6 py-3 bg-linear-to-r from-orange-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/50 hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100 disabled:hover:shadow-none"
          >
            {isSaving ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Saving...
              </span>
            ) : (
              "Save Context"
            )}
          </button>
          <button
            onClick={onDiscard}
            disabled={isSaving}
            className="flex-1 px-6 py-3 bg-zinc-900 text-white border border-zinc-800 rounded-xl font-medium hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}

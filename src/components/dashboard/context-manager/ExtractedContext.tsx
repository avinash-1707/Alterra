"use client";

import { CreateContextDTO } from "@/types/context";
import { useState, useEffect, useCallback } from "react";

interface ExtractedContextProps {
  context: CreateContextDTO;
  onSave: (context: CreateContextDTO) => void;
  onDiscard: () => void;
}

// Represents a single editable field path + value in the JSON tree
interface JsonField {
  id: string;
  path: (string | number)[];
  label: string;
  value: unknown;
  depth: number;
  isArrayItem: boolean;
}

// Recursively flatten a JSON object into key-value pairs with paths
function flattenJson(
  obj: unknown,
  path: (string | number)[] = [],
  depth = 0,
): JsonField[] {
  const fields: JsonField[] = [];

  if (obj === null || typeof obj !== "object") {
    return fields;
  }

  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      const itemPath = [...path, index];
      if (item !== null && typeof item === "object") {
        // Nested object/array inside array — recurse
        fields.push(...flattenJson(item, itemPath, depth + 1));
      } else {
        fields.push({
          id: itemPath.join("."),
          path: itemPath,
          label: String(index),
          value: item,
          depth,
          isArrayItem: true,
        });
      }
    });
  } else {
    Object.entries(obj as Record<string, unknown>).forEach(([key, value]) => {
      const fieldPath = [...path, key];
      if (value !== null && typeof value === "object") {
        // Nested — recurse, don't add a checkbox for the parent key itself
        fields.push(...flattenJson(value, fieldPath, depth + 1));
      } else {
        fields.push({
          id: fieldPath.join("."),
          path: fieldPath,
          label: key,
          value,
          depth,
          isArrayItem: false,
        });
      }
    });
  }

  return fields;
}

// Set a deeply nested value in an object (immutably)
function setNestedValue(
  obj: unknown,
  path: (string | number)[],
  value: unknown,
): unknown {
  if (path.length === 0) return value;

  const [head, ...rest] = path;
  if (Array.isArray(obj)) {
    const copy = [...obj];
    copy[head as number] = setNestedValue(copy[head as number], rest, value);
    return copy;
  } else {
    const copy = { ...(obj as Record<string, unknown>) };
    copy[head as string] = setNestedValue(copy[head as string], rest, value);
    return copy;
  }
}

// Remove a deeply nested value
function removeNestedValue(obj: unknown, path: (string | number)[]): unknown {
  if (path.length === 0) return obj;
  const [head, ...rest] = path;

  if (Array.isArray(obj)) {
    if (rest.length === 0) {
      return (obj as unknown[]).filter((_, i) => i !== (head as number));
    }
    const copy = [...obj];
    copy[head as number] = removeNestedValue(copy[head as number], rest);
    return copy;
  } else {
    const copy = { ...(obj as Record<string, unknown>) };
    if (rest.length === 0) {
      delete copy[head as string];
    } else {
      copy[head as string] = removeNestedValue(copy[head as string], rest);
    }
    return copy;
  }
}

// Format a value for display in the input
function formatValue(value: unknown): string {
  if (value === null) return "null";
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

// Parse a string back to an appropriate type
function parseValue(raw: string): unknown {
  if (raw === "null") return null;
  if (raw === "true") return true;
  if (raw === "false") return false;
  const num = Number(raw);
  if (raw !== "" && !isNaN(num)) return num;
  return raw;
}

// Determine syntax color for a value
function valueColorClass(value: unknown): string {
  if (value === null) return "text-zinc-500";
  switch (typeof value) {
    case "boolean":
      return "text-blue-400";
    case "number":
      return "text-amber-400";
    case "string":
      return "text-emerald-400";
    default:
      return "text-zinc-300";
  }
}

// Nice label formatting: camelCase → "Camel Case", snake_case → "Snake Case"
function formatLabel(label: string): string {
  return label
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^\s/, "")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function ExtractedContext({
  context,
  onSave,
  onDiscard,
}: ExtractedContextProps) {
  const [editableContext, setEditableContext] =
    useState<CreateContextDTO>(context);

  // All field IDs selected (included) by default
  const [deselectedIds, setDeselectedIds] = useState<Set<string>>(new Set());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  const fields = flattenJson(editableContext);

  useEffect(() => {
    setEditableContext(context);
    setDeselectedIds(new Set());
    setEditingId(null);
  }, [context]);

  const isSelected = (id: string) => !deselectedIds.has(id);

  const toggleField = (id: string) => {
    setDeselectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const startEdit = (field: JsonField) => {
    setEditingId(field.id);
    setEditingValue(formatValue(field.value));
  };

  const commitEdit = useCallback(
    (field: JsonField) => {
      const parsed = parseValue(editingValue);
      const updated = setNestedValue(editableContext, field.path, parsed);
      setEditableContext(updated as CreateContextDTO);
      setEditingId(null);
    },
    [editableContext, editingValue],
  );

  const handleSave = async () => {
    // Build a context that only includes selected fields
    let finalContext = editableContext;
    // Remove deselected fields (in reverse order to avoid path shifting)
    const deselectedFields = fields.filter((f) => deselectedIds.has(f.id));
    // Sort deepest paths last so parents aren't removed before children
    const sorted = [...deselectedFields].sort(
      (a, b) => b.path.length - a.path.length,
    );
    for (const field of sorted) {
      finalContext = removeNestedValue(
        finalContext,
        field.path,
      ) as CreateContextDTO;
    }

    setIsSaving(true);
    try {
      await onSave(finalContext);
    } catch (error) {
      console.error("Failed to save context:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const selectedCount = fields.length - deselectedIds.size;

  return (
    <div className="mt-8 pt-8 border-t border-zinc-800/50">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <h3 className="text-xl font-bold text-white">Extracted Context</h3>
        </div>
        <p className="text-sm text-zinc-400">
          All fields are selected by default. Uncheck any you want to exclude
          before saving. Click a value to edit it inline.
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

        {/* Field Editor */}
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl overflow-hidden">
          {/* Toolbar */}
          <div className="bg-zinc-950/50 px-4 py-2.5 border-b border-zinc-800/50 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">
              Context Fields
            </span>
            <div className="flex items-center gap-3">
              {deselectedIds.size > 0 && (
                <span className="text-xs text-orange-400">
                  {deselectedIds.size} field
                  {deselectedIds.size !== 1 ? "s" : ""} excluded
                </span>
              )}
              <span className="text-xs text-zinc-500">
                {selectedCount}/{fields.length} selected
              </span>
            </div>
          </div>

          {/* Field rows */}
          <div className="divide-y divide-zinc-800/40">
            {fields.map((field) => {
              const selected = isSelected(field.id);
              const isEditing = editingId === field.id;

              return (
                <div
                  key={field.id}
                  className={`flex items-center gap-3 px-4 py-2.5 transition-colors duration-150 group
                    ${selected ? "hover:bg-zinc-800/30" : "opacity-40 bg-zinc-950/20"}`}
                  style={{ paddingLeft: `${1 + field.depth * 1.25}rem` }}
                >
                  {/* Checkbox */}
                  <label className="flex items-center cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleField(field.id)}
                      className="w-3.5 h-3.5 rounded border-zinc-600 bg-zinc-800 text-orange-500 focus:ring-orange-500 focus:ring-offset-0 cursor-pointer accent-orange-500"
                    />
                  </label>

                  {/* Key label */}
                  <span className="text-xs font-mono text-zinc-400 shrink-0 min-w-30">
                    {field.isArrayItem ? (
                      <span className="text-zinc-600">[{field.label}]</span>
                    ) : (
                      <span title={field.label}>
                        {formatLabel(field.label)}
                      </span>
                    )}
                  </span>

                  {/* Value — click to edit */}
                  <div className="flex-1 min-w-0">
                    {isEditing ? (
                      <input
                        autoFocus
                        type="text"
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        onBlur={() => commitEdit(field)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") commitEdit(field);
                          if (e.key === "Escape") setEditingId(null);
                        }}
                        className="w-full bg-zinc-800 text-orange-300 px-2 py-0.5 rounded border border-orange-500/40 focus:outline-none focus:border-orange-500 font-mono text-sm"
                      />
                    ) : (
                      <button
                        disabled={!selected}
                        onClick={() => selected && startEdit(field)}
                        title="Click to edit"
                        className={`text-left font-mono text-sm truncate max-w-full rounded px-1.5 py-0.5 transition-colors duration-100
                          ${selected ? "hover:bg-zinc-800/60 cursor-text" : "cursor-default"}
                          ${valueColorClass(field.value)}`}
                      >
                        {typeof field.value === "string"
                          ? `"${field.value}"`
                          : formatValue(field.value)}
                      </button>
                    )}
                  </div>

                  {/* Type badge */}
                  <span className="text-[10px] text-zinc-600 font-mono shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    {field.value === null ? "null" : typeof field.value}
                  </span>
                </div>
              );
            })}
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
              `Save Context${deselectedIds.size > 0 ? ` (${selectedCount} fields)` : ""}`
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

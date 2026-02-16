"use client";

import GlassCard from "@/components/common/GlassCard";

interface Context {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  createdAt: Date;
  imageUrl?: string;
}

interface SavedContextsProps {
  contexts: Context[];
  onContextClick: (context: Context) => void;
  onDelete: (id: string) => void;
}

export default function SavedContexts({
  contexts,
  onContextClick,
  onDelete,
}: SavedContextsProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <div>
      {/* Section Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Saved Contexts</h3>
        <p className="text-zinc-400">
          {contexts.length} {contexts.length === 1 ? "context" : "contexts"}{" "}
          available
        </p>
      </div>

      {/* Contexts Grid */}
      {contexts.length === 0 ? (
        <GlassCard>
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-900/50 border border-zinc-800/50 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-zinc-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <p className="text-zinc-500 mb-2">No saved contexts yet</p>
            <p className="text-sm text-zinc-600">
              Upload an image to extract and save your first context
            </p>
          </div>
        </GlassCard>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contexts.map((context) => (
            <GlassCard key={context.id}>
              <div
                onClick={() => onContextClick(context)}
                className="p-6 cursor-pointer group"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-bold text-white truncate group-hover:text-orange-400 transition-colors">
                      {context.name}
                    </h4>
                    <p className="text-xs text-zinc-500 mt-1">
                      {formatDate(context.createdAt)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(context.id);
                    }}
                    className="p-2 -mr-2 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                  {context.description}
                </p>

                {/* Keywords */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {context.keywords.slice(0, 3).map((keyword, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-zinc-900/50 border border-zinc-800/50 rounded-md text-xs text-zinc-400"
                    >
                      {keyword}
                    </span>
                  ))}
                  {context.keywords.length > 3 && (
                    <span className="px-2 py-1 text-xs text-zinc-600">
                      +{context.keywords.length - 3} more
                    </span>
                  )}
                </div>

                {/* View Indicator */}
                <div className="flex items-center gap-2 text-xs text-zinc-500 group-hover:text-orange-400 transition-colors">
                  <span>Click to view details</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}

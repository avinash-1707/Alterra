"use client";

import GlassCard from "@/components/common/GlassCard";
import { Context } from "@/types/context";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onNext: () => void;
  onPrevious: () => void;
}

interface SavedContextsProps {
  contexts: Context[];
  onContextClick: (context: Context) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
  pagination?: PaginationProps;
}

export default function SavedContexts({
  contexts,
  onContextClick,
  onDelete,
  isLoading,
  isError,
  error,
  pagination,
}: SavedContextsProps) {
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(dateObj);
  };

  // Loading state
  if (isLoading) {
    return (
      <div>
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-2">Saved Contexts</h3>
          <p className="text-zinc-400">Loading contexts...</p>
        </div>
        <GlassCard>
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-900/50 border border-zinc-800/50 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-zinc-400 animate-spin"
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
            </div>
            <p className="text-zinc-500">Loading your contexts...</p>
          </div>
        </GlassCard>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div>
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-2">Saved Contexts</h3>
          <p className="text-zinc-400">Error loading contexts</p>
        </div>
        <GlassCard>
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-900/20 border border-red-800/50 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-red-400 mb-2">Failed to load contexts</p>
            <p className="text-sm text-zinc-600">
              {error?.message || "An unexpected error occurred"}
            </p>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div>
      {/* Section Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Saved Contexts</h3>
        <p className="text-zinc-400">
          {pagination?.totalCount ?? contexts.length}{" "}
          {(pagination?.totalCount ?? contexts.length) === 1
            ? "context"
            : "contexts"}{" "}
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
        <>
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
                        if (
                          window.confirm(
                            "Are you sure you want to delete this context?",
                          )
                        ) {
                          onDelete(context.id);
                        }
                      }}
                      className="p-2 -mr-2 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                      aria-label="Delete context"
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

                  {/* AI Prompt Block Preview */}
                  <p className="text-sm text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                    {context.aiPromptBlock}
                  </p>

                  {/* Metadata */}
                  <div className="space-y-2 mb-4">
                    {context.model && (
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-zinc-600">Model:</span>
                        <span className="text-zinc-400">{context.model}</span>
                      </div>
                    )}
                    {context.aspectRatio && (
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-zinc-600">Aspect Ratio:</span>
                        <span className="text-zinc-400">
                          {context.aspectRatio}
                        </span>
                      </div>
                    )}
                    {context.usageCount > 0 && (
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-zinc-600">Used:</span>
                        <span className="text-zinc-400">
                          {context.usageCount}{" "}
                          {context.usageCount === 1 ? "time" : "times"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {context.tags && context.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {context.tags
                        .slice(0, 3)
                        .map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-zinc-900/50 border border-zinc-800/50 rounded-md text-xs text-zinc-400"
                          >
                            {tag}
                          </span>
                        ))}
                      {context.tags.length > 3 && (
                        <span className="px-2 py-1 text-xs text-zinc-600">
                          +{context.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

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

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="mt-8">
              <GlassCard>
                <div className="p-4 flex items-center justify-between">
                  <div className="text-sm text-zinc-400">
                    <span className="font-medium text-white">
                      Page {pagination.currentPage}
                    </span>{" "}
                    of {pagination.totalPages}
                    <span className="mx-2">•</span>
                    <span>
                      {pagination.totalCount} total{" "}
                      {pagination.totalCount === 1 ? "context" : "contexts"}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={pagination.onPrevious}
                      disabled={!pagination.hasPreviousPage}
                      className="px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-200 disabled:hover:bg-zinc-900 disabled:hover:border-zinc-800"
                      aria-label="Previous page"
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
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={pagination.onNext}
                      disabled={!pagination.hasNextPage}
                      className="px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-200 disabled:hover:bg-zinc-900 disabled:hover:border-zinc-800"
                      aria-label="Next page"
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
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </GlassCard>
            </div>
          )}
        </>
      )}
    </div>
  );
}

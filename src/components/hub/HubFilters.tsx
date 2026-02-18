"use client";

interface HubFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function HubFilters({
  searchQuery,
  setSearchQuery,
}: HubFiltersProps) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl relative">
        {/* Search */}
        <svg
          className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search by prompt, tag, or creator..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-14 pr-12 py-4 bg-zinc-950/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl text-white text-lg placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

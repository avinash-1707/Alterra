interface HubHeroProps {
  totalCreations: number;
}

export default function HubHero({ totalCreations }: HubHeroProps) {
  return (
    <div className="relative mt-24">
      {/* Main heading */}
      <div className="text-center mb-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 leading-none">
          Alterra Hub
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
          Explore stunning creations from the Alterra community
        </p>
      </div>

      {/* Stats bar */}
      <div className="relative max-w-4xl mx-auto">
        <div className="relative bg-zinc-950/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Total Creations */}
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent tabular-nums mb-1">
                {totalCreations.toLocaleString()}
              </div>
              <div className="text-xs uppercase tracking-wider text-zinc-500">
                Creations
              </div>
            </div>

            {/* Active Creators */}
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent tabular-nums mb-1">
                8.2K
              </div>
              <div className="text-xs uppercase tracking-wider text-zinc-500">
                Creators
              </div>
            </div>

            {/* Total Likes */}
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent tabular-nums mb-1">
                127K
              </div>
              <div className="text-xs uppercase tracking-wider text-zinc-500">
                Likes
              </div>
            </div>

            {/* This Week */}
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent tabular-nums mb-1">
                +2.4K
              </div>
              <div className="text-xs uppercase tracking-wider text-zinc-500">
                This Week
              </div>
            </div>
          </div>

          {/* Decorative glow */}
          <div className="absolute inset-0 bg-linear-to-r from-orange-500/5 via-purple-500/5 to-cyan-500/5 rounded-2xl blur-xl -z-10" />
        </div>
      </div>

      {/* Floating badge */}
      <div className="flex justify-center mt-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-full">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-zinc-400 font-medium">
            <span className="text-green-400">Live</span> · Updated in real-time
          </span>
        </div>
      </div>
    </div>
  );
}

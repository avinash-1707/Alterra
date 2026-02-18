interface GalleryHeaderProps {
  totalImages: number;
  favoritesCount: number;
}

export default function GalleryHeader({
  totalImages,
  favoritesCount,
}: GalleryHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
          Gallery
        </h1>
        <p className="text-zinc-400 text-lg font-light">
          Your creative collection
        </p>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-400 tabular-nums">
            {totalImages}
          </div>
          <div className="text-xs uppercase tracking-wider text-zinc-500 mt-0.5">
            Total
          </div>
        </div>
        <div className="w-px h-10 bg-zinc-800" />
        <div className="text-center">
          <div className="text-2xl font-bold text-pink-400 tabular-nums">
            {favoritesCount}
          </div>
          <div className="text-xs uppercase tracking-wider text-zinc-500 mt-0.5">
            Favorites
          </div>
        </div>
      </div>
    </div>
  );
}

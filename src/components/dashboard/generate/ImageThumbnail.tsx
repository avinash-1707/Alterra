interface ImageThumbnailProps {
  previewUrl: string;
  fileName: string;
  onRemove: () => void;
}

export default function ImageThumbnail({
  previewUrl,
  fileName,
  onRemove,
}: ImageThumbnailProps) {
  return (
    <div className="flex items-center gap-3 p-2.5 bg-zinc-900/60 border border-zinc-800/50 rounded-xl">
      {/* Preview */}
      <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-zinc-700/50">
        <img
          src={previewUrl}
          alt="Pasted image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{fileName}</p>
        <p className="text-xs text-zinc-500 mt-0.5">
          Image attached · +3 credits
        </p>
      </div>

      {/* Remove */}
      <button
        onClick={onRemove}
        className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0"
        title="Remove image"
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
    </div>
  );
}

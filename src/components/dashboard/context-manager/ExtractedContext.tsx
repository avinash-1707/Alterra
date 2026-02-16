"use client";

interface Context {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  createdAt: Date;
  imageUrl?: string;
}

interface ExtractedContextProps {
  context: Context;
  onSave: (context: Context) => void;
  onDiscard: () => void;
}

export default function ExtractedContext({
  context,
  onSave,
  onDiscard,
}: ExtractedContextProps) {
  return (
    <div className="mt-8 pt-8 border-t border-zinc-800/50">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <h3 className="text-xl font-bold text-white">Extracted Context</h3>
        </div>
      </div>

      <div className="space-y-6">
        {/* Context Preview Card */}
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-2">
              Context Name
            </label>
            <p className="text-lg font-semibold text-white">{context.name}</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-2">
              Description
            </label>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {context.description}
            </p>
          </div>

          {/* Keywords */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-3">
              Keywords
            </label>
            <div className="flex flex-wrap gap-2">
              {context.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-linear-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/20 rounded-full text-xs font-medium text-orange-300"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Image Preview */}
          {context.imageUrl && (
            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-500 mb-3">
                Reference Image
              </label>
              <div className="aspect-video bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800/50">
                <img
                  src={context.imageUrl}
                  alt={context.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => onSave(context)}
            className="flex-1 px-6 py-3 bg-linear-to-r from-orange-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/50 hover:brightness-110 transition-all duration-300"
          >
            Save Context
          </button>
          <button
            onClick={onDiscard}
            className="flex-1 px-6 py-3 bg-zinc-900 text-white border border-zinc-800 rounded-xl font-medium hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}

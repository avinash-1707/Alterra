interface SmartToggleProps {
  enabled: boolean;
  onChange: (v: boolean) => void;
}

export default function SmartToggle({ enabled, onChange }: SmartToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-300 ${
        enabled
          ? "bg-linear-to-r from-orange-500/20 to-pink-500/20 border-orange-500/40 text-orange-300"
          : "bg-zinc-900/60 border-zinc-700/50 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600"
      }`}
      title="Toggle Smart Prompt Expansion"
    >
      {/* Toggle pill */}
      <div
        className={`relative w-7 h-4 rounded-full transition-colors duration-300 ${enabled ? "bg-orange-500" : "bg-zinc-700"}`}
      >
        <div
          className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform duration-300 ${
            enabled ? "translate-x-3.5" : "translate-x-0.5"
          }`}
        />
      </div>
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
      Smart Expand
    </button>
  );
}

import GlassCard from "@/components/common/GlassCard";

export default function OverviewSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {["Images", "Contexts", "Credits", "Teams"].map((label) => (
          <GlassCard key={label}>
            <div className="p-5">
              <p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p>
              <p className="mt-2 text-2xl font-semibold text-zinc-100">0</p>
            </div>
          </GlassCard>
        ))}
      </div>
      <GlassCard>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-zinc-100">Overview</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Monitor generation activity, saved contexts, and account usage.
          </p>
        </div>
      </GlassCard>
    </div>
  );
}

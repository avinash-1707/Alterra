import GlassCard from "@/components/common/GlassCard";

export default function HubSection() {
  return (
    <GlassCard>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-zinc-100">Hub</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Browse and manage shared assets, projects, and collaboration feeds.
        </p>
      </div>
    </GlassCard>
  );
}

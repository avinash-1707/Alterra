import GlassCard from "@/components/common/GlassCard";

export default function GenerateSection() {
  return (
    <GlassCard>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-zinc-100">Generate</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Create new outputs from prompts, styles, and model settings.
        </p>
      </div>
    </GlassCard>
  );
}

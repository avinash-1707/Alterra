import GlassCard from "@/components/common/GlassCard";

export default function ContextManagerSection() {
  return (
    <GlassCard>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-zinc-100">Context Manager</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Upload, organize, and version context data used during generation.
        </p>
      </div>
    </GlassCard>
  );
}

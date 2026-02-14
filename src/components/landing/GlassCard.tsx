interface GlassCardProps {
  children: React.ReactNode;
  glow?: boolean;
  className?: string;
}

export default function GlassCard({
  children,
  glow = false,
  className = "",
}: GlassCardProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Card */}
      <div className="relative bg-zinc-950/40 backdrop-blur-xl border border-zinc-800/50 rounded-3xl shadow-2xl overflow-hidden">
        {children}
      </div>

      {/* Optional Glow */}
      {glow && (
        <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 to-purple-500/10 rounded-3xl blur-2xl -z-10" />
      )}
    </div>
  );
}

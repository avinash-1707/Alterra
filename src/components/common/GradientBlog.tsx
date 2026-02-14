interface GradientBlobProps {
  className?: string;
  colors: string;
  blur?: string;
}

export default function GradientBlob({
  className = "",
  colors,
  blur = "blur-3xl",
}: GradientBlobProps) {
  return (
    <div
      className={`absolute rounded-full bg-linear-to-br ${colors} ${blur} opacity-50 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}

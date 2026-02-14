interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  onClick?: () => void;
  type?: "button" | "submit";
  fullWidth?: boolean;
}

export default function LandingButton({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  fullWidth = false,
}: ButtonProps) {
  const baseStyles = "rounded-full font-medium transition-all duration-300";

  const sizeStyles = {
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-lg hover:shadow-orange-500/50 hover:brightness-110",
    secondary:
      "bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700",
  };

  const widthStyle = fullWidth ? "w-full" : "inline-block";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle}`}
    >
      {children}
    </button>
  );
}

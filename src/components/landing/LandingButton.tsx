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
  const baseStyles =
    "rounded-full font-medium transition-all duration-300 active:scale-95";

  const sizeStyles = {
    md: `
      px-4 py-2 text-sm
      sm:px-6 sm:py-3 sm:text-base
      lg:px-7 lg:py-3.5 lg:text-base
    `,
    lg: `
      px-5 py-3 text-base
      sm:px-7 sm:py-4 sm:text-lg
      lg:px-9 lg:py-4 lg:text-xl
    `,
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-lg hover:shadow-orange-500/50 hover:brightness-110",
    secondary:
      "bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700",
  };

  const widthStyle = fullWidth ? "w-full sm:w-auto" : "w-auto";

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

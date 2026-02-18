import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps {
  text: string;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

function Button({
  text,
  href,
  variant = "primary",
  size = "sm",
  className,
  onClick,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  const variants = {
    primary: "bg-primary text-primary-foreground hover:opacity-90",
    secondary:
      "bg-secondary text-secondary-foreground border border-border hover:bg-accent/20",
    ghost: "hover:bg-accent/10 hover:text-primary",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const buttonClasses = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {text}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {text}
    </button>
  );
}

export default Button;
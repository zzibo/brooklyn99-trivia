"use client";

import { cn } from "@/lib/utils";

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
}

const variantClasses = {
  primary: "bg-primary text-primary-foreground hover:brightness-110",
  secondary: "bg-secondary text-secondary-foreground hover:brightness-110",
  danger: "bg-destructive text-white hover:brightness-110",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-[8px]",
  md: "px-4 py-2 text-[10px]",
  lg: "px-6 py-3 text-xs",
};

export function PixelButton({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: PixelButtonProps) {
  return (
    <button
      className={cn(
        "font-pixel pixel-border cursor-pointer rounded transition-all active:translate-y-0.5 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

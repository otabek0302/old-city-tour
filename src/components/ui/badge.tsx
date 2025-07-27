import React from "react";
import clsx from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = "primary", className }) => {
  return (
    <span
      className={clsx(
        "inline-block px-3 py-1 text-xs font-semibold rounded-full",
        variant === "primary" && "bg-primary text-primary-foreground",
        variant === "secondary" && "bg-muted text-foreground border border-border",
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge; 
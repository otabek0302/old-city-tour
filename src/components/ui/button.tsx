import { cn } from "@/utilities/ui";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

export const buttonVariants = cva("inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", {
  variants: {
    size: {
      xs: "px-2 py-1",
      sm: "px-4 py-1.5",
      md: "px-6 py-1.5",
      lg: "px-8 py-1.5",
      xl: "px-8 py-2",
      xxl: "px-10 py-2",
      clear: "",
      default: "h-10 px-4 py-2 text-sm",
      icon: "h-8 w-8 xl:h-10 xl:w-10 p-0",
      circle: "h-10 w-10 p-0 rounded-full",
      hero: "px-10 py-2",
      nav: "px-6 py-1.5"
    },
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      ghost: "hover:bg-card hover:text-accent-foreground",
      link: "text-primary items-start justify-start underline-offset-4 hover:underline",
      outline: "border border-border bg-background hover:bg-card hover:text-accent-foreground",
      primary: "bg-primary hover:bg-primary-dark text-primary-foreground shadow-none cursor-pointer",
      secondary: "bg-secondary hover:bg-secondary-dark text-secondary-foreground shadow-none cursor-pointer",
      nav: "bg-transparent hover:bg-primary-foreground text-copy-white hover:text-primary-dark text-sm font-semibold leading-tight",
      nav_active: "bg-background dark:bg-primary-foreground text-primary-dark hover:text-primary text-sm font-semibold leading-tight",
      icon: "bg-primary hover:bg-primary-dark text-primary-foreground rounded-full shadow-none",
      social_media: "bg-primary hover:bg-primary-dark text-secondary hover:text-secondary-dark rounded-full cursor-pointer shadow-none",
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
  },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ asChild = false, className, size, variant, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} className={cn(buttonVariants({ size, variant }), className)} {...props} />;
});

Button.displayName = "Button";
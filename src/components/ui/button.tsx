import { cn } from "@/utilities/ui";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

export const buttonVariants = cva("inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", {
  variants: {
    size: {
      xs: "h-7 px-2 text-xs",
      sm: "h-9 rounded px-3 text-sm",
      clear: "",
      default: "h-10 px-4 py-2 text-sm",
      md: "h-10 px-5 text-base",
      lg: "h-11 rounded px-8 text-base",
      xl: "h-12 px-10 text-lg",
      icon: "h-10 w-10 p-0",
      circle: "h-10 w-10 p-0 rounded-full",
      pill: "h-10 px-6 rounded-full",
    },
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      ghost: "hover:bg-card hover:text-accent-foreground",
      link: "text-primary items-start justify-start underline-offset-4 hover:underline",
      outline: "border border-border bg-background hover:bg-card hover:text-accent-foreground",
      primary: "bg-primary text-primary-foreground hover:bg-primary-dark",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      nav: "px-3 py-2 bg-transparent text-primary-foreground hover:text-primary-dark font-semibold",
      icon: "bg-primary hover:bg-primary-dark text-primary-foreground rounded-full",
      circle: "bg-muted text-foreground rounded-full hover:bg-accent",
      pill: "bg-primary text-primary-foreground rounded-full hover:bg-primary/80",
      subtle: "bg-muted text-foreground hover:bg-accent",
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
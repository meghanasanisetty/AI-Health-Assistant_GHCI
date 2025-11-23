// Minimal comments for fast competition review:
// Purpose: Small, reusable Badge component with variants via class-variance-authority.
// Usage: <Badge variant="secondary">Label</Badge> — lightweight, decorative status/label.

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Badge variants:
// Defines visual variants (default, secondary, destructive, outline) used by Badge.
// Keep variants centralized for consistent styling across the app.
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

// Badge:
// Simple wrapper that applies badgeVariants and merges className.
// Intended for short labels, statuses, or counts. Accessible as a div by default.
function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

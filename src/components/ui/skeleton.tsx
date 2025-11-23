// Utility for merging Tailwind classes
import { cn } from "@/lib/utils";

// Skeleton component → used as a loading placeholder
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    // Pulse animation + muted background creates skeleton effect
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props} // allow extra styling/attributes
    />
  );
}

export { Skeleton };

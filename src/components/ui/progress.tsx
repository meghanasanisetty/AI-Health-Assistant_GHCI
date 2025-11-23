import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

// Progress component using Radix UI Progress primitive
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(
  // value controls the filled percentage of the progress bar
  ({ className, value, ...props }, ref) => (
    // Root container for the progress bar
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary", // styling for track
        className
      )}
      {...props}
    >
      {/* The moving indicator that represents progress */}
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-primary transition-all" // smooth animated progress
        style={{
          // Translate X from right to left based on progress value
          transform: `translateX(-${100 - (value || 0)}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  )
);

// Sets the displayName for React DevTools
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

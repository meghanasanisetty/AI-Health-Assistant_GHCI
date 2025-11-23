// Separator component using Radix UI's separator primitive
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

// ForwardRef allows parent components to access the DOM node
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    {
      className,
      orientation = "horizontal", // default layout direction
      decorative = true, // non-semantic by default (for UI, not accessibility landmarks)
      ...props
    },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      // horizontal: full width thin line | vertical: full height thin line
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className,
      )}
      {...props}
    />
  ),
);

// Set component display name for React DevTools inspection
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };

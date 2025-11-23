import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

// Popover root wrapper from Radix UI
const Popover = PopoverPrimitive.Root;

// Clickable element that opens the popover
const PopoverTrigger = PopoverPrimitive.Trigger;

// Custom content wrapper with forwardRef for positioning and accessibility
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(
  (
    {
      className,
      align = "center", // default alignment of the popover relative to trigger
      sideOffset = 4, // spacing between trigger and popover
      ...props
    },
    ref
  ) => (
    // Renders the popover content inside a portal (appended outside DOM flow)
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          // Base styling + state/position based animations
          "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none " +
            "data-[state=open]:animate-in data-[state=closed]:animate-out " +
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 " +
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 " +
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 " +
            "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
);

PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };

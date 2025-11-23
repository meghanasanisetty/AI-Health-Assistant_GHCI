// Importing React to use JSX and forwardRef
import * as React from "react";

// Importing Radix UI Radio Group primitives
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

// Importing an icon used for the selected state circle
import { Circle } from "lucide-react";

// Utility function for conditional class merging
import { cn } from "@/lib/utils";

// --------------------------------------------
// RadioGroup Component
// Wraps Radix's RadioGroup root with custom styling
// --------------------------------------------
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    // Radix root that manages radio group behavior
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)} // grid layout + custom styling
      {...props}
      ref={ref}
    />
  );
});

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

// --------------------------------------------
// RadioGroupItem Component (individual option)
// Renders a single selectable radio button
// --------------------------------------------
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        // Styling:
        // - rounded circle
        // - border to indicate unselected state
        // - focus-visible styles for accessibility
        // - disabled state support
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {/* Indicator appears only when the item is selected */}
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        {/* Filled circle visible in selected state */}
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

// Exporting components to be used elsewhere
export { RadioGroup, RadioGroupItem };

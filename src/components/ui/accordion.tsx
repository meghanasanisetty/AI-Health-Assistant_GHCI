// Minimal (competition POV): Accessible Accordion primitives wrapping Radix UI — quick usage: <Accordion type="single" collapsible> with AccordionItem/Trigger/Content.

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Root Accordion component.
 *
 * Use this to wrap one or more AccordionItem components.
 * It directly re-exports Radix's Accordion root and accepts the same props
 * (type, defaultValue, value, onValueChange, etc.).
 */
const Accordion = AccordionPrimitive.Root;

/**
 * AccordionItem
 *
 * A single item in the accordion. Use as a direct child of <Accordion>.
 * This component forwards its ref to Radix's Accordion.Item.
 *
 * Props: same as Radix's Accordion.Item (value required when using controlled behavior).
 */
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

/**
 * AccordionTrigger
 *
 * The clickable header that toggles the accordion item's content visibility.
 * Use this inside AccordionItem and place the visible heading text as children.
 *
 * Behavior:
 * - Adds an accessible header wrapper via Radix's Accordion.Header.
 * - Uses an icon that rotates when the item is open.
 * - Accepts all props for Radix's Accordion.Trigger.
 */
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

/**
 * AccordionContent
 *
 * The region that is shown/hidden when the corresponding trigger is toggled.
 * Use this inside AccordionItem directly after AccordionTrigger.
 *
 * Notes:
 * - Uses Radix's animation data attributes for open/close transitions.
 * - Accepts all props for Radix's Accordion.Content.
 */
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

// Export components for use in the app.
// Usage example:
// <Accordion type="single" collapsible>
//   <AccordionItem value="item-1">
//     <AccordionTrigger>Title</AccordionTrigger>
//     <AccordionContent>Details...</AccordionContent>
//   </AccordionItem>
// </Accordion>
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

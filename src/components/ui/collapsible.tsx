// Minimal comments for fast competition review:
// Purpose: Thin re-exports of Radix Collapsible primitives for consistent imports and usage.
// Usage: <Collapsible><CollapsibleTrigger>...</CollapsibleTrigger><CollapsibleContent>...</CollapsibleContent></Collapsible>

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

// Collapsible: Root provider for collapsible state. Wraps trigger/content pairs.
const Collapsible = CollapsiblePrimitive.Root;

// CollapsibleTrigger: The element that toggles the content visibility.
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

// CollapsibleContent: The content region that is shown/hidden.
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

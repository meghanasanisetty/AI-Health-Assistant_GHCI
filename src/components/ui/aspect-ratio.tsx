// Lightweight wrapper for Radix's AspectRatio primitive.
// Purpose: provide a consistent, named export for layout use across the app.
// Usage: <AspectRatio ratio={16/9}>...</AspectRatio>

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

// Re-export Radix AspectRatio root as a named component for clarity in imports.
const AspectRatio = AspectRatioPrimitive.Root;

export { AspectRatio };

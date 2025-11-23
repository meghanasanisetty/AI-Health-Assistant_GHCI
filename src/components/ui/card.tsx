// Minimal comments for fast competition review:
// Purpose: Simple Card primitives for consistent containers (header, content, footer) with design-system styles.
// Usage: <Card><CardHeader>...<CardTitle/>...</CardHeader><CardContent/> <CardFooter/></Card>

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Card
 *
 * Root container providing border, background and rounded corners.
 * Use as the outer wrapper for card content.
 */
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
));
Card.displayName = "Card";

/**
 * CardHeader
 *
 * Top area for title/metadata. Adds consistent padding and vertical spacing.
 */
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

/**
 * CardTitle
 *
 * Prominent heading for the card. Use for main title text.
 */
const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

/**
 * CardDescription
 *
 * Supporting text beneath the title. Use for brief descriptive content.
 */
const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

/**
 * CardContent
 *
 * Main content area for the card. Use for body content.
 */
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
);
CardContent.displayName = "CardContent";

/**
 * CardFooter
 *
 * Bottom area for actions or meta. Consistent padding and alignment.
 */
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };

// Minimal comments for fast competition review:
// Purpose: Small, accessible Avatar primitives wrapping Radix Avatar. Provide consistent sizing, fallback, and image handling.
// Usage: <Avatar><AvatarImage src="..." alt="..."/><AvatarFallback>AB</AvatarFallback></Avatar>

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

// Avatar:
// Root container for avatar content. Keeps a fixed size, rounded shape and overflow handling.
// Forwarded ref supports integration with Radix primitives and parent control.
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

// AvatarImage:
// Renders the avatar image. Use `alt` for accessibility.
// Falls back to AvatarFallback when image fails to load.
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

// AvatarFallback:
// Shown when image is unavailable. Suitable for initials or an icon.
// Matches Avatar dimensions and styling.
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };

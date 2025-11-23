// Uses next-themes to detect the current theme (light/dark/system)
import { useTheme } from "next-themes";

// Sonner provides toast notifications
import { Toaster as Sonner, toast } from "sonner";

// Reuse Sonner's props for type safety
type ToasterProps = React.ComponentProps<typeof Sonner>;

// Custom Toaster wrapper for theme-aware styling
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme(); // fallback to system theme

  return (
    <Sonner
      // Pass active theme to Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      // Tailwind classes to style toast + buttons
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props} // allow custom config
    />
  );
};

// Export toaster + toast hook for usage across app
export { Toaster, toast };

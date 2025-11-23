import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;        // Base style for the link
  activeClassName?: string;  // Applied when the route is active
  pendingClassName?: string; // Applied when the route is still loading
}

// Custom NavLink wrapper for better handling of active + pending styles
const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        // react-router provides isActive and isPending to style based on state
        className={({ isActive, isPending }) =>
          cn(
            className,                // Default styles
            isActive && activeClassName,  // Add active class if route is active
            isPending && pendingClassName // Add pending class when navigating
          )
        }
        {...props}
      />
    );
  },
);

// Helps React DevTools show the correct component name
NavLink.displayName = "NavLink";

export { NavLink };

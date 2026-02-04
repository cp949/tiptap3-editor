import React from "react";
import { cn } from "../../../utils/cn";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "primary-outline";
  size?: "sm" | "md";
}

export const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ className, variant = "primary", size = "sm", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "te-appearance-none te-border te-border-transparent te-border-solid te-flex te-items-center te-justify-center te-font-medium te-transition-all te-duration-200 te-rounded te-shadow-sm focus:te-outline-none focus:te-ring-2 focus:te-ring-offset-1",
          // Size variants
          size === "sm" && "te-h-8 te-text-xs te-px-3",
          size === "md" && "te-h-9 te-text-sm te-px-4",
          // Color variants
          // Color variants
          variant === "primary" &&
            "te-bg-[#3480F9] te-text-white hover:te-bg-[#2C6FE5] active:te-bg-[#245ECF] focus:te-ring-[#3480F9]",
          variant === "primary-outline" &&
            "te-bg-white te-text-[#3480F9] te-border-[#3480F9] hover:te-bg-blue-50 active:te-bg-blue-100 focus:te-ring-[#3480F9]",
          variant === "secondary" &&
            "te-bg-white te-text-gray-700 te-border-gray-400 hover:te-bg-gray-50 hover:te-border-gray-500 active:te-bg-gray-100 focus:te-ring-gray-200",
          variant === "ghost" &&
            "te-bg-transparent te-text-gray-600 te-shadow-none hover:te-text-[#3480F9] hover:te-bg-blue-50 focus:te-ring-[#3480F9]",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ActionButton.displayName = "ActionButton";

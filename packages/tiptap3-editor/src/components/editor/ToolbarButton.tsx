import type React from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface ToolbarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  isActive,
  className = "",
  children,
  ...props
}) => {
  return (
    <button
      type="button"
      className={cn(
        "te-p-1.5 te-rounded te-transition-colors te-flex te-items-center te-justify-center te-border te-border-solid",
        // Base styles
        "te-bg-editor-toolbar te-text-editor-text-secondary te-border-editor-border hover:te-bg-editor-toolbar-hover te-relative",
        // Active styles (Mantine: Light Blue bg + Blue text, Standard Gray Border)
        isActive &&
          "te-bg-primary-light te-text-primary-text hover:!te-bg-primary-light",
        className,
      )}
      data-active={isActive ? "true" : undefined}
      {...props}
    >
      {children}
    </button>
  );
};

import React, { memo } from "react";
import { useTiptapEditorContext } from "../TiptapEditorContext";
import { cn } from "../../../utils/cn";

export interface ControlProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export const Control = memo(({
  children,
  className = "",
  isActive,
  disabled,
  ...props
}: ControlProps) => {
  const { isReadOnly, editor } = useTiptapEditorContext();

  return (
    <button
      type="button"
      className={cn(
        "te-w-7 te-h-7 te-p-0 te-flex te-items-center te-justify-center te-text-editor-text-secondary te-bg-editor-toolbar hover:te-bg-editor-toolbar-hover te-border te-border-editor-border te-rounded te-transition-colors disabled:te-opacity-50 disabled:te-cursor-not-allowed",
        isActive && "te-bg-primary-light te-text-primary-text hover:!te-bg-primary-light",
        className,
      )}
      disabled={!editor || isReadOnly || disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Control.displayName = "Control";

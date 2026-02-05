import type React from "react";
import { cn } from "../../utils/cn";

export const TiptapEditorToolbar = ({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "te-bg-editor-toolbar te-border-b te-border-solid te-border-editor-border te-border-t-0 te-border-x-0 te-flex te-flex-wrap te-items-center te-sticky te-top-0 te-z-10 te-overflow-x-auto te-max-w-full",
        // Mantine spacing: xs (10px) vertical, md (16px) horizontal
        "te-py-[10px] te-px-[16px] te-gap-[10px]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const TiptapEditorControlsGroup = ({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "te-flex te-items-center [&>button]:te-rounded-none [&>button:first-child]:te-rounded-l [&>button:last-child]:te-rounded-r [&>button:not(:first-child)]:te--ml-px",
        className,
      )}
    >
      {children}
    </div>
  );
};

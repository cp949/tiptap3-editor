import type React from "react";
import { useEffect, useState } from "react";
import { ActionButton } from "./controls/ActionButton";

interface SourceViewerProps {
  content: string;
  onApply: (newContent: string) => void;
  onCancel: () => void;
}

export const SourceViewer: React.FC<SourceViewerProps> = ({
  content,
  onApply,
  onCancel,
}) => {
  const [value, setValue] = useState(content);

  useEffect(() => {
    setValue(content);
  }, [content]);

  return (
    <div className="te-flex te-flex-col te-h-full te-min-h-[200px]">
      <textarea
        className="te-flex-1 te-w-full te-p-4 te-font-mono te-text-sm te-bg-gray-50 te-border te-border-gray-300 te-rounded-md focus:te-ring-2 focus:te-ring-blue-500 te-outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="te-flex te-justify-end te-gap-2 te-mt-2">
        <ActionButton
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </ActionButton>
        <ActionButton
          variant="primary"
          onClick={() => onApply(value)}
        >
          Apply Source
        </ActionButton>
      </div>
    </div>
  );
};

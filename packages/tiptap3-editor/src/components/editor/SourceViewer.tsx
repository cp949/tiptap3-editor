import type React from "react";
import { useEffect, useState } from "react";

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
        <button
          type="button"
          className="te-px-4 te-py-2 te-text-sm te-text-gray-600 hover:te-bg-gray-100 te-rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="te-px-4 te-py-2 te-text-sm te-text-white te-bg-blue-600 hover:te-bg-blue-700 te-rounded"
          onClick={() => onApply(value)}
        >
          Apply Source
        </button>
      </div>
    </div>
  );
};

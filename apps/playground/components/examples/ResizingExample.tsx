"use client";

import { RichEditor } from "@cp949/tiptap3-editor";
import { Button } from "@mui/material";
import { Maximize2, Minimize2 } from "lucide-react";
import { useState } from "react";

export const ResizingExample = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [content, setContent] = useState(`<p>Try clicking the button below to toggle the height of this editor!</p><p>${"This is a long content to demonstrate scrolling. ".repeat(50)}</p>`);

  return (
    <div className="te-space-y-4">
      <div className="te-flex te-justify-end">
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="te-flex te-items-center te-gap-2 te-px-4 te-py-2 te-bg-primary te-text-white te-rounded te-text-sm te-font-medium hover:te-bg-primary/90 te-transition-colors"
        >
          {isExpanded ? (
            <>
              <Minimize2 size={16} />
              Minmize View (400px)
            </>
          ) : (
            <>
              <Maximize2 size={16} />
              Expand View (800px)
            </>
          )}
        </Button>
      </div>

      <div className="te-bg-white te-border te-rounded-lg te-overflow-hidden te-shadow-sm">
        <RichEditor
          content={content}
          onChange={setContent}
          height={isExpanded ? 800 : 400}
        />
      </div>
      
      <p className="te-text-sm te-text-gray-500">
        Current Height: <strong>{isExpanded ? "800px" : "400px"}</strong> (Uses <code>height</code> prop)
      </p>
    </div>
  );
};

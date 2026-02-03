"use client";

import { DefaultToolbar, TiptapEditor } from "@cp949/tiptap3-editor";
import { useState } from "react";

export const DefaultEditorExample = () => {
  const [content, setContent] = useState("<p>This is the <b>default</b> editor configuration.</p><p>It comes with a built-in toolbar that handles standard formatting tasks.</p>");

  return (
    <div className="te-space-y-6">
      <div className="te-bg-white te-border te-border-gray-200 te-rounded-xl te-shadow-sm te-overflow-hidden">
        <TiptapEditor content={content} onChange={setContent}>
          <DefaultToolbar />
          <TiptapEditor.TableBubbleMenu />
          <TiptapEditor.Content />
        </TiptapEditor>
      </div>

      <div className="te-bg-gray-50 te-border te-border-gray-200 te-rounded-lg te-p-4">
        <h3 className="te-text-xs te-font-bold te-text-gray-500 te-uppercase te-mb-2">Real-time HTML Output</h3>
        <pre className="te-text-xs te-font-mono te-text-gray-700 te-whitespace-pre-wrap te-break-all">
          {content}
        </pre>
      </div>
    </div>
  );
};

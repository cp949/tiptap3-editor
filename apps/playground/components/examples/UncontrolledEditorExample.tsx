"use client";

import { useState } from "react";
import { TiptapEditor, type Editor } from "@cp949/tiptap3-editor";

export const UncontrolledEditorExample = () => {
  const [editorRef, setEditorRef] = useState<Editor | null>(null);

  // 1. Defined initial content only once.
  // This string is passed to Tiptap core during initialization.
  const initialContent = "<p>This is an <b>Uncontrolled</b> editor example.</p><p>It uses <code>initialContent</code> prop for native performance. Typing should feel faster.</p>";

  const handleReset = () => {
    // 3. External Control via captured instance
    // Instead of updating a 'content' prop (which causes re-renders and serialization overhead),
    // we use the directly captured editor instance to modify content.
    if (editorRef) {
        editorRef.commands.setContent("<p>Content has been reset remotely!</p>");
    }
  };

  return (
    <div className="te-space-y-6">
      <div className="te-flex te-justify-end">
        <button 
            type="button"
            onClick={handleReset}
            className="te-px-4 te-py-2 te-bg-blue-600 te-text-white te-rounded-md te-text-sm hover:te-bg-blue-700 te-transition-colors"
        >
            Reset Content (Remote Control)
        </button>
      </div>

      <div className="te-bg-white te-border te-border-gray-200 te-rounded-xl te-shadow-sm te-overflow-hidden">
        {/* 
            2. Uncontrolled Mode Setup 
            - initialContent: Sets start value (no sync afterwards)
            - onCreate: Captures the editor instance for external control
            - onChange: Optional, just for listening to updates (debounced)
        */}
        <TiptapEditor 
            initialContent={initialContent} 
            onCreate={setEditorRef}
            onChange={(html) => console.log("Content changed (debounced):", html)}
            debounceDuration={500}
        >
          <TiptapEditor.Toolbar />
          <TiptapEditor.TableBubbleMenu />
          <TiptapEditor.LinkBubbleMenu />
          <TiptapEditor.Content />
        </TiptapEditor>
      </div>

      <div className="te-bg-gray-50 te-border te-border-gray-200 te-rounded-lg te-p-4">
        <h3 className="te-text-xs te-font-bold te-text-gray-500 te-uppercase te-mb-2">Info</h3>
        <p className="te-text-sm te-text-gray-600">
            This editor runs in <b>Uncontrolled Mode</b> (Recommended for performance). 
            React re-renders do not force the editor to re-serialize content, ensuring native typing speed.
            <br className="te-my-1" />
            Use the <b>Reset Content</b> button to see how to control the editor using the <code>onCreate</code> callback pattern.
        </p>
      </div>
    </div>
  );
};

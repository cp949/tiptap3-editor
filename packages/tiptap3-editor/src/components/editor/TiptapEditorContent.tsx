import { EditorContent } from "@tiptap/react";
import type React from "react";

import { SourceViewer } from "./SourceViewer";
import { useTiptapEditorContext } from "./TiptapEditorContext";
import { cn } from "../../utils/cn";

export interface TiptapEditorContentProps {
  className?: string;
  style?: React.CSSProperties;
}

export const TiptapEditorContent = ({ className, style }: TiptapEditorContentProps) => {
  const { editor, isSourceMode, toggleSourceMode, initialContent } = useTiptapEditorContext();

  if (!editor) {
    return (
      <div
        className={cn("te-flex-1 te-min-h-[12rem] te-bg-editor-bg", className)}
        style={style}
      >
        <div className="te-p-4">
          <div
            className="te-prose te-max-w-none te-outline-none [&_.ProseMirror]:te-min-h-[12rem]"
            dangerouslySetInnerHTML={{ __html: initialContent || "" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("te-flex-1 te-min-h-[12rem] te-bg-editor-bg", className)}
      style={style}
    >
      {isSourceMode ? (
        <SourceViewer
          content={editor.getHTML()}
          onApply={(newHtml) => {
            editor.commands.setContent(newHtml);
            toggleSourceMode();
          }}
          onCancel={toggleSourceMode}
        />
      ) : (
        <div className="te-p-4">
          <EditorContent
            editor={editor}
            className="te-prose te-max-w-none focus:te-outline-none [&_.ProseMirror]:te-min-h-[12rem] [&_.ProseMirror]:te-outline-none"
          />
        </div>
      )}
    </div>
  );
};

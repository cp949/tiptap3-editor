"use client";

import { BasicEditor } from "@cp949/tiptap3-editor";
import { useState } from "react";
import { OutputPanel } from "../common/OutputPanel";

export const BasicEditorExample = () => {
  const [content, setContent] = useState("<p>This is the <b>Basic Editor</b> template.</p><p>It includes only the essential formatting tools.</p>");

  return (
    <div className="te-space-y-8">
      <div className="te-bg-white">
        <BasicEditor content={content} onChange={setContent} />
      </div>

      <OutputPanel title="Real-time HTML Output" count={content.length}>
        {content}
      </OutputPanel>
    </div>
  );
};

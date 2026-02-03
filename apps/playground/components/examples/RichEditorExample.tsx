"use client";

import { RichEditor } from "@cp949/tiptap3-editor";
import { useState } from "react";
import { OutputPanel } from "../common/OutputPanel";

export const RichEditorExample = () => {
  const [content, setContent] = useState("<p>This is the <b>Rich Editor</b> template.</p><p>It comes with a comprehensive set of tools including tables, images, and text alignment.</p>");

  return (
    <div className="te-space-y-8">
      <div className="te-bg-white">
        <RichEditor content={content} onChange={setContent} />
      </div>

      <OutputPanel title="Real-time HTML Output" count={content.length}>
        {content}
      </OutputPanel>
    </div>
  );
};

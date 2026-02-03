"use client";

import "@tiptap/starter-kit";
import "@tiptap/extension-underline";
import "@tiptap/extension-image";
import "@tiptap/extension-table";
import "@tiptap/extension-text-align";
import { TiptapEditor } from "@cp949/tiptap3-editor";
import { useState } from "react";
import { OutputPanel } from "../common/OutputPanel";

export const CustomToolbarExample = () => {
  const [content, setContent] = useState(
    "<h2>Custom Toolbar Demo</h2><p>This editor instance uses a <b>completely custom toolbar</b> injected via the <code>toolbar</code> prop.</p><blockquote>It demonstrates how you can build a production-grade interface on top of the headless editor core.</blockquote>"
  );

  return (
    <div className="te-space-y-8">
      <TiptapEditor content={content} onChange={setContent}>
        <TiptapEditor.Toolbar>
          <div className="te-flex te-items-center te-mr-2">
            <span className="te-text-xs te-font-bold te-text-indigo-600 te-px-2">
              PRO MODE
            </span>
          </div>

          <TiptapEditor.ControlsGroup>
            <TiptapEditor.Undo />
            <TiptapEditor.Redo />
          </TiptapEditor.ControlsGroup>

          <TiptapEditor.ControlsGroup>
            <TiptapEditor.Bold />
            <TiptapEditor.Italic />
            <TiptapEditor.Underline />
            <TiptapEditor.Strike />
            <TiptapEditor.Code />
            <TiptapEditor.Blockquote />
          </TiptapEditor.ControlsGroup>

          <TiptapEditor.ControlsGroup>
            <TiptapEditor.H1 />
            <TiptapEditor.H2 />
            <TiptapEditor.H3 />
          </TiptapEditor.ControlsGroup>

          <TiptapEditor.ControlsGroup>
            <TiptapEditor.AlignLeft />
            <TiptapEditor.AlignCenter />
            <TiptapEditor.AlignRight />
            <TiptapEditor.AlignJustify />
          </TiptapEditor.ControlsGroup>

          <TiptapEditor.ControlsGroup>
            <TiptapEditor.BulletList />
            <TiptapEditor.OrderedList />
          </TiptapEditor.ControlsGroup>

          <TiptapEditor.ControlsGroup>
            <TiptapEditor.Image />
            <TiptapEditor.Source />
          </TiptapEditor.ControlsGroup>
        </TiptapEditor.Toolbar>
        <TiptapEditor.Content />
      </TiptapEditor>

      <OutputPanel title="Real-time HTML Output" count={content.length}>
        {content}
      </OutputPanel>
    </div>
  );
};

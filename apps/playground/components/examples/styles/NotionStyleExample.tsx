import React from "react";
import { TiptapEditor } from "@cp949/tiptap3-editor";

const content = `
<h2>Notion Style Example</h2>
<p>This editor mimics the style of Notion.</p>
<ul>
  <li>Sticky Toolbar</li>
  <li>Minimalist Design</li>
  <li>No borders</li>
</ul>
<p>Start typing to see the effect...</p>
`;

export const NotionStyleExample = () => {
  return (
    <div className="relative border border-gray-200 rounded-lg min-h-[500px] bg-white text-[#37352f]">
      {/* 
        Custom CSS Variables for Notion-like feel 
        Notion uses specific sans-serif stack and colors.
      */}
      <style>{`
        .notion-theme {
          --te-font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
          --te-text-primary: #37352f;
          --te-bg-toolbar: rgba(255, 255, 255, 0.9);
          --te-radius: 0px;
        }
      `}</style>

      <TiptapEditor 
        content={content} 
        className="notion-theme border-0 shadow-none"
      >
        <div className="sticky top-0 z-10 border-b border-gray-100 backdrop-blur-sm">
             <TiptapEditor.Toolbar className="px-4 py-2 border-0 bg-transparent gap-4">
                <TiptapEditor.ControlsGroup className="rounded-md border border-gray-200 bg-white shadow-sm">
                   <TiptapEditor.Bold />
                   <TiptapEditor.Italic />
                   <TiptapEditor.Strike />
                   <TiptapEditor.Code />
                </TiptapEditor.ControlsGroup>
                
                <TiptapEditor.ControlsGroup className="rounded-md border border-gray-200 bg-white shadow-sm">
                    <TiptapEditor.H1 />
                    <TiptapEditor.H2 />
                    <TiptapEditor.H3 />
                </TiptapEditor.ControlsGroup>

                <TiptapEditor.ControlsGroup className="rounded-md border border-gray-200 bg-white shadow-sm">
                   <TiptapEditor.Link />
                </TiptapEditor.ControlsGroup>
             </TiptapEditor.Toolbar>
        </div>
        
        <div className="max-w-3xl mx-auto px-12 py-8 min-h-[400px]">
            <TiptapEditor.Content className="prose-lg" />
        </div>
      </TiptapEditor>
    </div>
  );
};

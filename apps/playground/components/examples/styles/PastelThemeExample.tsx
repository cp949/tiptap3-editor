import React from "react";
import { RichEditor } from "@cp949/tiptap3-editor";

export const PastelThemeExample = () => {
  return (
    <div className="min-h-[500px] p-4 bg-pink-50 rounded-xl">
        <style>{`
        .pastel-theme {
          --te-primary: #ec4899;          /* Pink 500 */
          --te-primary-focus: rgba(236, 72, 153, 0.2);
          
          --te-bg-toolbar: #fff1f2;       /* Rose 50 */
          --te-bg-toolbar-hover: #ffe4e6; /* Rose 100 */
          
          --te-border: #fbcfe8;           /* Pink 200 */
          --te-border-focus: #ec4899;     /* Pink 500 */
          
          --te-radius: 16px;              /* Very rounded */
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-bold text-pink-600 mb-4 px-2">🎀 Pastel Vibes</h3>
        
        <RichEditor 
            content="
                <h3>Custom Brand Theme</h3>
                <p>You can easily match your brand identity.</p>
                <blockquote>This example uses Pink/Rose colors and large border radius.</blockquote>
            " 
            className="pastel-theme border-2 border-pink-300 shadow-pink-100 shadow-xl"
        />
      </div>
    </div>
  );
};

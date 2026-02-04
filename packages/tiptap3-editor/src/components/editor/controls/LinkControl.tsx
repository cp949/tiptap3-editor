import React, { useState, useEffect } from "react";
import { Link as LinkIcon } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { useTiptapEditorContext } from "../TiptapEditorContext";
import { ActionButton } from "./ActionButton";
import { Control, type ControlProps } from "./Control";

export const LinkControl = (props: ControlProps) => {
  const { editor, setActiveToolbarPopup } = useTiptapEditorContext();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [href, setHref] = useState("");

  useEffect(() => {
    if (editor) {
      if (open) {
          setActiveToolbarPopup("link");
          // Close the floating bubble menu if it's open
          // @ts-ignore
          if (editor.storage.link) {
              // @ts-ignore
              editor.storage.link.edit = false;
          }

          let initialText = "";
          let initialHref = "";

          if (editor.isActive("link")) {
            // If editing an existing link, try to get the full link text
            
            // Use standard extendMarkRange logic to find boundaries
            editor.chain().extendMarkRange("link").run();
            
            const selection = editor.state.selection;
            initialText = editor.state.doc.textBetween(selection.from, selection.to);
            initialHref = editor.getAttributes("link").href || "";
          } else {
            // New link
            const { from, to } = editor.state.selection;
            initialText = editor.state.doc.textBetween(from, to);
            initialHref = "";
          }

          setText(initialText);
          setHref(initialHref);
      } else {
          setActiveToolbarPopup(null);
      }
    }
  }, [open, editor]);

  const handleInsert = () => {
    if (!editor) return;

    if (text && href) {
        // If we have text and href
        if (editor.state.selection.empty) {
             // If cursor, insert text with link
             editor
                .chain()
                .focus()
                .insertContent({
                    type: 'text',
                    text: text,
                    marks: [{ type: 'link', attrs: { href } }]
                })
                .run();
        } else {
            // If selection, update link. 
            // Note: If text changed, we technically need to replace the content too.
             editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href })
                .run();
                
             // If text is different from selection, we might want to replace it? 
             // Umo logic suggests replacing content if text changed.
             // For now, let's stick to setLink if selection exists, unless text is vastly different?
             // Actually, if user changes text in the box, they expect the editor text to change.
             const { from, to } = editor.state.selection;
             const currentText = editor.state.doc.textBetween(from, to);
             if (text !== currentText) {
                 editor.chain().insertContentAt({ from, to }, {
                    type: 'text',
                    text: text,
                    marks: [{ type: 'link', attrs: { href } }]
                 }).run();
             }
        }
    }
    setOpen(false);
  };

  const handleRemove = () => {
    editor?.chain().focus().unsetLink().run();
    setOpen(false);
  };

  /* Smart Enter Navigation Logic */
  const textInputRef = React.useRef<HTMLInputElement>(null);
  const urlInputRef = React.useRef<HTMLInputElement>(null);

  const handleTextKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      urlInputRef.current?.focus();
    }
  };

  const handleUrlKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (text.trim()) {
         handleInsert();
      }
    }
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Control
          isActive={editor?.isActive("link")}
          title="Link"
          {...props}
        >
          <LinkIcon size={18} />
        </Control>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="te-z-[100] te-mt-1 te-shadow-lg te-border te-border-editor-border te-bg-white te-rounded te-outline-none te-animate-in te-fade-in te-zoom-in-95 te-p-3 te-w-[300px] te-flex te-flex-col te-gap-3"
          sideOffset={5}
          align="start"
          onFocusOutside={(e) => e.preventDefault()}
        >
            <div className="te-flex te-flex-col te-gap-1.5">
                <label className="te-text-xs te-font-medium te-text-gray-500">Link Text</label>
                <input 
                    ref={textInputRef}
                    className="te-h-9 te-text-sm te-border te-border-gray-300 te-rounded te-px-2.5 te-w-full focus:te-outline-none focus:te-border-blue-500 focus:te-ring-1 focus:te-ring-blue-500 te-transition-all"
                    placeholder="Text to display"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleTextKeyDown}
                />
            </div>
            
            <div className="te-flex te-flex-col te-gap-1.5">
                <label className="te-text-xs te-font-medium te-text-gray-500">Link URL</label>
                <input 
                    ref={urlInputRef}
                    className="te-h-9 te-text-sm te-border te-border-gray-300 te-rounded te-px-2.5 te-w-full focus:te-outline-none focus:te-border-blue-500 focus:te-ring-1 focus:te-ring-blue-500 te-transition-all"
                    placeholder="https://example.com"
                    value={href}
                    onChange={(e) => setHref(e.target.value)}
                    onKeyDown={handleUrlKeyDown}
                />
            </div>

            <div className="te-flex te-items-center te-justify-start te-gap-3 te-mt-1">
                <ActionButton
                    variant="primary-outline"
                    onClick={handleInsert}
                >
                    Insert
                </ActionButton>
                 <ActionButton
                    variant="secondary"
                    onClick={handleRemove}
                >
                    Remove
                </ActionButton>
            </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

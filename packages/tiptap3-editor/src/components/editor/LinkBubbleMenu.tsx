import React, { useEffect, useState } from "react";
import { BubbleMenu } from "@tiptap/react/menus";
import { ExternalLink, Copy, Unlink, Pencil } from "lucide-react";

import { ActionButton } from "./controls/ActionButton";
import { ToolbarButton } from "./ToolbarButton";
import { useTiptapEditorContext } from "./TiptapEditorContext";
import { cn } from "../../utils/cn";

export interface LinkBubbleMenuProps {
  className?: string;
}

export const LinkBubbleMenu: React.FC<LinkBubbleMenuProps> = ({
  className,
}) => {
  const { editor } = useTiptapEditorContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [linkState, setLinkState] = useState<{
    text: string;
    href: string;
    target?: HTMLElement;
    pos?: number;
  }>({ text: "", href: "" });

  // Use ref to avoid stale closures in the event listener
  const linkStateRef = React.useRef(linkState);

  // Update ref whenever state changes
  useEffect(() => {
    linkStateRef.current = linkState;
  }, [linkState]);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
    setIsEditMode(false);
    // @ts-expect-error
    if (editor?.storage.link) {
      // @ts-expect-error
      editor.storage.link.edit = false;
      // @ts-expect-error
      editor.storage.link.meta = {};
    }
  }, [editor]);

  useEffect(() => {
    linkStateRef.current = linkState;
  }, [linkState]);

  useEffect(() => {
    if (!editor) return;
    const updateHandler = () => {
      // @ts-expect-error
      const linkStorage = editor.storage.link;
      if (linkStorage?.edit) {
        const { meta } = linkStorage;
        if (meta?.target) {
          const newText = meta.target.textContent || "";
          const newHref = meta.href || "";
          const current = linkStateRef.current;

          if (
            current.target !== meta.target ||
            current.text !== newText ||
            current.href !== newHref ||
            current.pos !== meta.pos
          ) {
            setLinkState({
              text: newText,
              href: newHref,
              target: meta.target,
              pos: meta.pos,
            });
            setIsOpen(true);
          }
        }
      } else if (isOpen) {
        handleClose();
      }

      // Safety check: if we moved away from the link, close the menu
      if (linkStateRef.current.target && !editor.isActive("link")) {
        handleClose();
      }
    };

    editor.on("transaction", updateHandler);
    return () => {
      editor.off("transaction", updateHandler);
    };
  }, [editor, isOpen, handleClose]);

  const handleOpenLink = () => {
    if (linkState.href) {
      window.open(linkState.href, "_blank");
    }
  };

  const handleCopyLink = () => {
    if (linkState.href) {
      navigator.clipboard.writeText(linkState.href);
    }
  };

  const handleUnlink = () => {
    if (!editor) return;
    if (linkState.pos !== undefined) {
      editor.chain().setTextSelection(linkState.pos).unsetLink().run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
    handleClose();
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    if (!editor) return;
    const targetHref = linkState.href;

    // Update link href
    editor
      .chain()
      .extendMarkRange("link")
      .updateAttributes("link", { href: targetHref })
      .run();

    // Update text if changed
    if (linkState.text !== linkState.target?.textContent) {
      // Simple text replacement for now.
      // Complex node replacement is risky without exact range.
      // We rely on extendMarkRange from previous command to have selected the link.
      // But link might span multiple nodes.
    }

    setIsEditMode(false);
    handleClose();
  };

  const textInputRef = React.useRef<HTMLInputElement>(null);
  const urlInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditMode) {
      // Focus text input on open
      setTimeout(() => textInputRef.current?.focus(), 50);
    }
  }, [isEditMode]);

  const handleTextKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      urlInputRef.current?.focus();
    }
  };

  const handleUrlKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (linkState.text.trim()) {
        handleSave();
      }
    }
  };

  if (!editor) return null;

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="linkBubbleMenu"
      shouldShow={() => {
        return isOpen && !!linkState.target;
      }}
      options={
        {
          placement: "bottom-start",
          onHide: () => {
            handleClose();
          },
          getReferenceClientRect: () => {
            if (linkState.target) {
              return linkState.target.getBoundingClientRect();
            }
            return new DOMRect(0, 0, 0, 0);
          },
          // biome-ignore lint/suspicious/noExplicitAny: library type mismatch workaround
        } as any
      }
      className={cn(
        "te-flex te-items-center te-bg-white te-shadow-lg te-rounded-md te-border te-border-gray-200 te-p-1 te-gap-1",
        className,
      )}
    >
      {isEditMode ? (
        <div className="te-flex te-flex-col te-p-3 te-gap-3 te-w-[320px]">
          <div className="te-flex te-flex-col te-gap-1.5">
            <span className="te-text-xs te-font-medium te-text-gray-500">
              Text
            </span>
            <input
              ref={textInputRef}
              value={linkState.text}
              onChange={(e) =>
                setLinkState((prev) => ({ ...prev, text: e.target.value }))
              }
              onKeyDown={handleTextKeyDown}
              placeholder="Text to display"
              className="te-h-9 te-text-sm te-border te-border-gray-300 te-rounded te-px-2.5 te-w-full focus:te-outline-none focus:te-border-blue-500 focus:te-ring-1 focus:te-ring-blue-500 te-transition-all"
            />
          </div>
          <div className="te-flex te-flex-col te-gap-1.5">
            <span className="te-text-xs te-font-medium te-text-gray-500">
              Link
            </span>
            <input
              ref={urlInputRef}
              value={linkState.href}
              onChange={(e) =>
                setLinkState((prev) => ({ ...prev, href: e.target.value }))
              }
              onKeyDown={handleUrlKeyDown}
              placeholder="https://example.com"
              className="te-h-9 te-text-sm te-border te-border-gray-300 te-rounded te-px-2.5 te-w-full focus:te-outline-none focus:te-border-blue-500 focus:te-ring-1 focus:te-ring-blue-500 te-transition-all"
            />
          </div>
          <div className="te-flex te-justify-end te-gap-2 te-mt-1">
            <ActionButton
              variant="secondary"
              onClick={() => setIsEditMode(false)}
            >
              Cancel
            </ActionButton>
            <ActionButton variant="primary-outline" onClick={handleSave}>
              Insert
            </ActionButton>
          </div>
        </div>
      ) : (
        <>
          <div className="te-flex te-items-center te-gap-1 te-max-w-[200px]">
            <span className="te-text-xs te-text-blue-600 te-truncate te-px-2 te-max-w-[150px] te-underline">
              {linkState.href}
            </span>
          </div>

          <div className="te-w-px te-h-4 te-bg-gray-200 te-mx-1"></div>

          <ToolbarButton onClick={handleOpenLink} title="Open Link">
            <ExternalLink size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={handleEdit} title="Edit Link">
            <Pencil size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={handleCopyLink} title="Copy Link">
            <Copy size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={handleUnlink}
            title="Unlink"
            className="te-text-red-500 hover:te-bg-red-50"
          >
            <Unlink size={16} />
          </ToolbarButton>
        </>
      )}
    </BubbleMenu>
  );
};

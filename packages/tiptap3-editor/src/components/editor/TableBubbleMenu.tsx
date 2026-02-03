import { useCallback } from "react";
import { BubbleMenu } from "@tiptap/react/menus";
import type { Editor } from "@tiptap/react";
import {
  PanelLeft,
  PanelRight,
  PanelTop,
  PanelBottom,
  Trash2,
  Split,
  Merge,

} from "lucide-react";
import { useTiptapEditorContext } from "./TiptapEditorContext";
import { ToolbarButton } from "./ToolbarButton";
import { cn } from "../../utils/cn";

export const TableBubbleMenu = ({ className }: { className?: string }) => {
  const { editor } = useTiptapEditorContext();

  const shouldShow = useCallback(({ editor }: { editor: Editor }) => editor.isActive("table"), []);
  const appendTo = useCallback(() => document.body, []);

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu
      editor={editor}
      appendTo={appendTo}
      shouldShow={shouldShow}
    >
      <div
        className={cn(
          "te-flex te-flex-wrap te-bg-editor-toolbar te-border te-border-editor-border te-rounded te-shadow-md te-p-1 te-gap-1 te-items-center te-z-50 te-relative te-max-w-[90vw]",
          className,
        )}
      >
        {/* Column Operations */}
        <div className="te-flex te-gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().addColumnBefore().run()}
            disabled={!editor.can().addColumnBefore()}
            title="Add Column Before"
            className="te-text-blue-600"
          >
            <PanelLeft size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().addColumnAfter().run()}
            disabled={!editor.can().addColumnAfter()}
            title="Add Column After"
            className="te-text-blue-600"
          >
            <PanelRight size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().deleteColumn().run()}
            disabled={!editor.can().deleteColumn()}
            title="Delete Column"
            className="te-text-red-500 hover:te-bg-red-50"
          >
            <Trash2 size={16} />
            <span className="te-text-[10px] te-ml-1">Col</span>
          </ToolbarButton>
        </div>

        <div className="te-w-px te-h-6 te-bg-editor-border te-mx-1" />

        {/* Row Operations */}
        <div className="te-flex te-gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().addRowBefore().run()}
            disabled={!editor.can().addRowBefore()}
            title="Add Row Before"
            className="te-text-blue-600"
          >
            <PanelTop size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().addRowAfter().run()}
            disabled={!editor.can().addRowAfter()}
            title="Add Row After"
            className="te-text-blue-600"
          >
            <PanelBottom size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().deleteRow().run()}
            disabled={!editor.can().deleteRow()}
            title="Delete Row"
            className="te-text-red-500 hover:te-bg-red-50"
          >
            <Trash2 size={16} />
            <span className="te-text-[10px] te-ml-1">Row</span>
          </ToolbarButton>
        </div>

        <div className="te-w-px te-h-6 te-bg-editor-border te-mx-1" />

        {/* Cell Operations */}
        <ToolbarButton
          onClick={() => editor.chain().focus().mergeCells().run()}
          disabled={!editor.can().mergeCells()}
          title="Merge Cells"
        >
          <Merge size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().splitCell().run()}
          disabled={!editor.can().splitCell()}
          title="Split Cell"
        >
          <Split size={16} />
        </ToolbarButton>

        <div className="te-w-px te-h-6 te-bg-editor-border te-mx-1" />

        {/* Table Operations */}
        <ToolbarButton
          onClick={() => editor.chain().focus().deleteTable().run()}
          disabled={!editor.can().deleteTable()}
          title="Delete Table"
          className="te-text-red-600 hover:te-bg-red-50"
        >
          <Trash2 size={16} />
          <span className="te-text-[10px] te-ml-1">Table</span>
        </ToolbarButton>
      </div>
    </BubbleMenu>
  );
};

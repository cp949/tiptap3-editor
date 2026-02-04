import { useCallback, useState } from "react";
import { BubbleMenu } from "@tiptap/react/menus";
import type { Editor } from "@tiptap/react";
import * as Popover from "@radix-ui/react-popover";
import {
  PanelLeft,
  PanelRight,
  PanelTop,
  PanelBottom,
  Trash2,
  Split,
  Merge,
  AlignCenter,
  PaintBucket,
  ChevronDown,
  Rows,
  Columns,
  Square,
  Wrench,
  ChevronRight,
  ChevronLeft,
  Heading,
} from "lucide-react";
import { useTiptapEditorContext } from "./TiptapEditorContext";
import { ToolbarButton } from "./ToolbarButton";
import { cn } from "../../utils/cn";

const COLORS = [
  "#000000", "#434343", "#666666", "#999999", "#b7b7b7", "#cccccc", "#d9d9d9", "#efefef", "#f3f3f3", "#ffffff",
  "#980000", "#ff0000", "#ff9900", "#ffff00", "#00ff00", "#00ffff", "#4a86e8", "#0000ff", "#9900ff", "#ff00ff",
  "#e6b8af", "#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#c9daf8", "#cfe2f3", "#d9d2e9", "#ead1dc",
];

const ALIGNMENTS = [
  { value: "left-top", label: "Left Top" },
  { value: "center-top", label: "Center Top" },
  { value: "right-top", label: "Right Top" },
  { value: "left-middle", label: "Left Middle" },
  { value: "center-middle", label: "Center Middle" },
  { value: "right-middle", label: "Right Middle" },
  { value: "left-bottom", label: "Left Bottom" },
  { value: "center-bottom", label: "Center Bottom" },
  { value: "right-bottom", label: "Right Bottom" },
];

export const TableBubbleMenu = ({ className }: { className?: string }) => {
  const { editor } = useTiptapEditorContext();
  const [bgOpen, setBgOpen] = useState(false);
  const [borderOpen, setBorderOpen] = useState(false);
  const [alignOpen, setAlignOpen] = useState(false);

  const shouldShow = useCallback(({ editor }: { editor: Editor }) => editor.isActive("table"), []);
  const appendTo = useCallback(() => document.body, []);

  if (!editor) {
    return null;
  }

  const setCellAlign = (align: string) => {
    editor.chain().focus().setCellAttribute("align", align).run();
    setAlignOpen(false);
  };

  const setCellBackground = (color: string | null) => {
    editor.chain().focus().setCellAttribute("background", color).run();
    setBgOpen(false);
  };

  const setCellBorderColor = (color: string | null) => {
    editor.chain().focus().setCellAttribute("borderColor", color).run();
    setBorderOpen(false);
  };

  return (
    <BubbleMenu
      editor={editor}
      appendTo={appendTo}
      shouldShow={shouldShow}
      updateDelay={0}
      options={{
        placement: "top",
        offset: 8,
      }}
    >
      <div
        className={cn(
          "te-flex te-flex-wrap te-bg-editor-toolbar te-border te-border-editor-border te-rounded te-shadow-lg te-p-1.5 te-gap-1.5 te-items-center te-z-[9999] te-relative te-max-w-[calc(100vw-2rem)] md:te-max-w-[600px]",
          className,
        )}
      >
        {/* Group 1: Alignment & Headers */}
        <div className="te-flex te-items-center te-gap-1">
          <Popover.Root open={alignOpen} onOpenChange={setAlignOpen}>
            <Popover.Trigger asChild>
              <ToolbarButton title="Cell Alignment" className="te-px-1 te-gap-1">
                <AlignCenter size={16} />
                <ChevronDown size={12} />
              </ToolbarButton>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content 
                className="te-z-[100] te-p-1 te-bg-editor-toolbar te-border te-border-editor-border te-rounded te-shadow-xl te-grid te-grid-cols-3 te-gap-1 te-animate-in te-fade-in te-zoom-in-95"
                sideOffset={5}
              >
                {ALIGNMENTS.map((align) => (
                  <button
                    key={align.value}
                    title={align.label}
                    className={cn(
                      "te-w-8 te-h-8 te-flex te-items-center te-justify-center te-rounded hover:te-bg-editor-toolbar-hover",
                      editor.getAttributes("tableCell").align === align.value && "te-bg-editor-toolbar-hover te-text-primary"
                    )}
                    onClick={() => setCellAlign(align.value)}
                  >
                    <div className={cn(
                      "te-w-4 te-h-4 te-border te-border-current te-relative",
                      align.value.includes("top") && "te-border-t-2",
                      align.value.includes("bottom") && "te-border-b-2",
                      align.value.includes("left") && "te-border-l-2",
                      align.value.includes("right") && "te-border-r-2",
                    )}>
                        <div className={cn(
                          "te-absolute te-w-1 te-h-1 te-bg-current te-rounded-full",
                          align.value.includes("top") && "te-top-0",
                          align.value.includes("bottom") && "te-bottom-0",
                          align.value.includes("middle") && "te-top-1/2 te--translate-y-1/2",
                          align.value.includes("left") && "te-left-0",
                          align.value.includes("right") && "te-right-0",
                          align.value.includes("center") && "te-left-1/2 te--translate-x-1/2",
                        )} />
                    </div>
                  </button>
                ))}
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

          <div className="te-flex te-gap-0.5 te-ml-1">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeaderRow().run()}
              isActive={editor.isActive("tableHeader")}
              title="Toggle Header Row"
            >
              <Rows size={16} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
              title="Toggle Header Column"
            >
              <Columns size={16} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeaderCell().run()}
              title="Toggle Header Cell"
              isActive={editor.isActive("tableHeader")} // Check if current cell is header
            >
              <Heading size={16} />
            </ToolbarButton>
          </div>
        </div>

        <div className="te-w-px te-h-6 te-bg-editor-border" />

        {/* Group 2: Cell Styles */}
        <div className="te-flex te-items-center te-gap-1">
          <Popover.Root open={bgOpen} onOpenChange={setBgOpen}>
            <Popover.Trigger asChild>
              <ToolbarButton
                title="Cell Background"
                isActive={!!editor.getAttributes("tableCell").background}
              >
                <PaintBucket size={16} />
                {editor.getAttributes("tableCell").background && (
                  <div 
                    className="te-absolute te-bottom-1 te-right-1 te-w-2 te-h-2 te-rounded-full te-border te-border-white"
                    style={{ backgroundColor: editor.getAttributes("tableCell").background }}
                  />
                )}
              </ToolbarButton>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content 
                className="te-z-[100] te-p-2 te-bg-editor-toolbar te-border te-border-editor-border te-rounded te-shadow-xl te-grid te-grid-cols-10 te-gap-1 te-animate-in te-fade-in te-zoom-in-95"
                sideOffset={5}
              >
                {COLORS.map((color) => (
                  <button
                    key={color}
                    className="te-w-5 te-h-5 te-rounded-sm te-border te-border-editor-border hover:te-scale-110 te-transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => setCellBackground(color)}
                  />
                ))}
                <button
                  className="te-col-span-full te-mt-2 te-text-[10px] te-py-1 te-border te-border-editor-border te-rounded hover:te-bg-editor-toolbar-hover te-transition-colors"
                  onClick={() => setCellBackground(null)}
                >
                  Reset Background
                </button>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

          <Popover.Root open={borderOpen} onOpenChange={setBorderOpen}>
            <Popover.Trigger asChild>
              <ToolbarButton
                title="Cell Border Color"
                isActive={!!editor.getAttributes("tableCell").borderColor}
              >
                <Square size={16} />
                {editor.getAttributes("tableCell").borderColor && (
                  <div 
                    className="te-absolute te-bottom-1 te-right-1 te-w-2 te-h-2 te-rounded-full te-border te-border-white"
                    style={{ backgroundColor: editor.getAttributes("tableCell").borderColor }}
                  />
                )}
              </ToolbarButton>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content 
                className="te-z-[100] te-p-2 te-bg-editor-toolbar te-border te-border-editor-border te-rounded te-shadow-xl te-grid te-grid-cols-10 te-gap-1 te-animate-in te-fade-in te-zoom-in-95"
                sideOffset={5}
              >
                {COLORS.map((color) => (
                  <button
                    key={color}
                    className="te-w-5 te-h-5 te-rounded-sm te-border te-border-editor-border hover:te-scale-110 te-transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => setCellBorderColor(color)}
                  />
                ))}
                <button
                  className="te-col-span-full te-mt-2 te-text-[10px] te-py-1 te-border te-border-editor-border te-rounded hover:te-bg-editor-toolbar-hover te-transition-colors"
                  onClick={() => setCellBorderColor(null)}
                >
                  Reset Border Color
                </button>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>

        <div className="te-w-px te-h-6 te-bg-editor-border" />

        {/* Group 3: Column Operations */}
        <div className="te-flex te-items-center te-gap-1">
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
          </ToolbarButton>
        </div>

        <div className="te-w-px te-h-6 te-bg-editor-border" />

        {/* Group 4: Row Operations */}
        <div className="te-flex te-items-center te-gap-1">
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
          </ToolbarButton>
        </div>

        <div className="te-w-px te-h-6 te-bg-editor-border" />

        {/* Group 5: Cell & Table Operations */}
        <div className="te-flex te-items-center te-gap-1">
          <div className="te-flex te-gap-1">
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
          </div>
          
          <div className="te-w-px te-h-6 te-bg-editor-border mx-1" />

          <ToolbarButton
            onClick={() => editor.chain().focus().deleteTable().run()}
            disabled={!editor.can().deleteTable()}
            title="Delete Table"
            className="te-text-red-600 hover:te-bg-red-50"
          >
            <Trash2 size={16} />
          </ToolbarButton>
        </div>

        <div className="te-w-px te-h-6 te-bg-editor-border" />

        {/* Group 6: Navigation & Utils */}
        <div className="te-flex te-items-center te-gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().goToPreviousCell().run()}
            disabled={!editor.can().goToPreviousCell()}
            title="Previous Cell"
          >
            <ChevronLeft size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().goToNextCell().run()}
            disabled={!editor.can().goToNextCell()}
            title="Next Cell"
          >
            <ChevronRight size={16} />
          </ToolbarButton>
          
          <div className="te-w-px te-h-6 te-bg-editor-border mx-1" />

          <ToolbarButton
            onClick={() => editor.commands.fixTables()}
            disabled={!editor.can().fixTables()}
            title="Fix Tables (Repair broken table structures)"
          >
            <Wrench size={16} />
          </ToolbarButton>
        </div>
      </div>
    </BubbleMenu>
  );
};

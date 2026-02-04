import { useState } from "react";
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  Strikethrough as StrikeIcon,
  Code as CodeIcon,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  AlignLeft as AlignLeftIcon,
  AlignCenter as AlignCenterIcon,
  AlignRight as AlignRightIcon,
  AlignJustify as AlignJustifyIcon,
  List,
  ListOrdered,
  Image as ImageIcon,
  Table as TableIcon,
  Undo as UndoIcon,
  Redo as RedoIcon,
  RemoveFormatting,
  FileCode,
  Highlighter,
  Palette,
} from "lucide-react";

import { useTiptapEditorContext } from "../TiptapEditorContext";
import { Control, type ControlProps } from "./Control";
import { ColorPicker } from "./ColorPicker";
import { TableGridPicker } from "./TableGridPicker";
import * as Popover from "@radix-ui/react-popover";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

// Typography
export const BoldControl = (props: ControlProps) => {
  const { editor } = useTiptapEditorContext();
  return (
    <Control
      onClick={() => editor?.chain().focus().toggleBold().run()}
      disabled={!editor?.can().chain().focus().toggleBold().run()}
      isActive={editor?.isActive("bold")}
      title="Bold (Ctrl+B)"
      {...props}
    >
      <BoldIcon size={18} />
    </Control>
  );
};

export const ItalicControl = (props: ControlProps) => {
  const { editor } = useTiptapEditorContext();
  return (
    <Control
      onClick={() => editor?.chain().focus().toggleItalic().run()}
      disabled={!editor?.can().chain().focus().toggleItalic().run()}
      isActive={editor?.isActive("italic")}
      title="Italic (Ctrl+I)"
      {...props}
    >
      <ItalicIcon size={18} />
    </Control>
  );
};

export const UnderlineControl = (props: ControlProps) => {
  const { editor } = useTiptapEditorContext();
  return (
    <Control
      onClick={() => editor?.chain().focus().toggleUnderline().run()}
      disabled={!editor?.can().chain().focus().toggleUnderline().run()}
      isActive={editor?.isActive("underline")}
      title="Underline (Ctrl+U)"
      {...props}
    >
      <UnderlineIcon size={18} />
    </Control>
  );
};

export const StrikeControl = (props: ControlProps) => {
  const { editor } = useTiptapEditorContext();
  return (
    <Control
      onClick={() => editor?.chain().focus().toggleStrike().run()}
      disabled={!editor?.can().chain().focus().toggleStrike().run()}
      isActive={editor?.isActive("strike")}
      title="Strikethrough (Ctrl+Shift+X)"
      {...props}
    >
      <StrikeIcon size={18} />
    </Control>
  );
};

export const CodeControl = (props: ControlProps) => {
  const { editor } = useTiptapEditorContext();
  return (
    <Control
      onClick={() => editor?.chain().focus().toggleCode().run()}
      disabled={!editor?.can().chain().focus().toggleCode().run()}
      isActive={editor?.isActive("code")}
      title="Inline Code (Ctrl+E)"
      {...props}
    >
      <CodeIcon size={18} />
    </Control>
  );
};

export const ClearFormattingControl = (props: ControlProps) => {
    const { editor } = useTiptapEditorContext();
    return (
      <Control
        onClick={() => editor?.chain().focus().unsetAllMarks().run()}
        title="Clear Formatting"
        {...props}
      >
        <RemoveFormatting size={18} />
      </Control>
    );
  };

// Headings
export const H1Control = (props: ControlProps) => {
  const { editor } = useTiptapEditorContext();
  return (
    <Control
      onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
      isActive={editor?.isActive("heading", { level: 1 })}
      title="Heading 1"
      {...props}
    >
      <Heading1 size={18} />
    </Control>
  );
};

export const H2Control = (props: ControlProps) => {
  const { editor } = useTiptapEditorContext();
  return (
    <Control
      onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
      isActive={editor?.isActive("heading", { level: 2 })}
      title="Heading 2"
      {...props}
    >
      <Heading2 size={18} />
    </Control>
  );
};

export const H3Control = (props: ControlProps) => {
  const { editor } = useTiptapEditorContext();
  return (
    <Control
      onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
      isActive={editor?.isActive("heading", { level: 3 })}
      title="Heading 3"
      {...props}
    >
      <Heading3 size={18} />
    </Control>
  );
};

export const BlockquoteControl = (props: ControlProps) => {
    const { editor } = useTiptapEditorContext();
    return (
      <Control
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        isActive={editor?.isActive("blockquote")}
        title="Blockquote (Ctrl+Shift+B)"
        {...props}
      >
        <Quote size={18} />
      </Control>
    );
  };

// Alignment
export const AlignLeftControl = (props: ControlProps) => {
  const { editor } = useTiptapEditorContext();
  return (
    <Control
      onClick={() => editor?.chain().focus().setTextAlign("left").run()}
      isActive={editor?.isActive({ textAlign: "left" })}
      title="Align Left (Ctrl+Shift+L)"
      {...props}
    >
      <AlignLeftIcon size={18} />
    </Control>
  );
};

export const AlignCenterControl = (props: ControlProps) => {
  const { editor } = useTiptapEditorContext();
  return (
    <Control
      onClick={() => editor?.chain().focus().setTextAlign("center").run()}
      isActive={editor?.isActive({ textAlign: "center" })}
      title="Align Center (Ctrl+Shift+E)"
      {...props}
    >
      <AlignCenterIcon size={18} />
    </Control>
  );
};

export const AlignRightControl = (props: ControlProps) => {
  const { editor } = useTiptapEditorContext();
  return (
    <Control
      onClick={() => editor?.chain().focus().setTextAlign("right").run()}
      isActive={editor?.isActive({ textAlign: "right" })}
      title="Align Right (Ctrl+Shift+R)"
      {...props}
    >
      <AlignRightIcon size={18} />
    </Control>
  );
};

export const AlignJustifyControl = (props: ControlProps) => {
  const { editor } = useTiptapEditorContext();
  return (
    <Control
      onClick={() => editor?.chain().focus().setTextAlign("justify").run()}
      isActive={editor?.isActive({ textAlign: "justify" })}
      title="Justify (Ctrl+Shift+J)"
      {...props}
    >
      <AlignJustifyIcon size={18} />
    </Control>
  );
};

// Lists
export const BulletListControl = (props: ControlProps) => {
  const { editor } = useTiptapEditorContext();
  return (
    <Control
      onClick={() => editor?.chain().focus().toggleBulletList().run()}
      isActive={editor?.isActive("bulletList")}
      title="Bullet List (Ctrl+Shift+8)"
      {...props}
    >
      <List size={18} />
    </Control>
  );
};

export const OrderedListControl = (props: ControlProps) => {
  const { editor } = useTiptapEditorContext();
  return (
    <Control
      onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      isActive={editor?.isActive("orderedList")}
      title="Ordered List (Ctrl+Shift+7)"
      {...props}
    >
      <ListOrdered size={18} />
    </Control>
  );
};

// History
export const UndoControl = (props: ControlProps) => {
  const { editor } = useTiptapEditorContext();
  return (
    <Control
      onClick={() => editor?.chain().focus().undo().run()}
      disabled={!editor?.can().chain().focus().undo().run()}
      title="Undo (Ctrl+Z)"
      {...props}
    >
      <UndoIcon size={18} />
    </Control>
  );
};

export const RedoControl = (props: ControlProps) => {
  const { editor } = useTiptapEditorContext();
  return (
    <Control
      onClick={() => editor?.chain().focus().redo().run()}
      disabled={!editor?.can().chain().focus().redo().run()}
      title="Redo (Ctrl+Y)"
      {...props}
    >
      <RedoIcon size={18} />
    </Control>
  );
};

// Inserts (Simplified for now, prompt helper could be improved later)
export const ImageControl = (props: ControlProps) => {
  const { editor } = useTiptapEditorContext();
  return (
    <Control
      onClick={() => {
        const url = window.prompt("Image URL");
        if (url) {
          editor?.chain().focus().setImage({ src: url }).run();
        }
      }}
      title="Insert Image"
      {...props}
    >
      <ImageIcon size={18} />
    </Control>
  );
};

export const TableControl = (props: ControlProps) => {
  const { editor } = useTiptapEditorContext();
  const [open, setOpen] = useState(false);

  const handleSelect = (rows: number, cols: number) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: true })
      .run();
    setOpen(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Control
          title="Insert Table"
          {...props}
        >
          <TableIcon size={18} />
        </Control>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="te-z-[100] te-mt-1 te-shadow-lg te-border te-border-editor-border te-bg-editor-toolbar te-rounded te-outline-none te-animate-in te-fade-in te-zoom-in-95"
          sideOffset={5}
          align="start"
        >
          <TableGridPicker onSelect={handleSelect} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

// Source
export const SourceControl = (props: ControlProps) => {
  const { isSourceMode, toggleSourceMode } = useTiptapEditorContext();
  return (
    <Control
      onClick={toggleSourceMode}
      isActive={isSourceMode}
      title="View HTML Source"
      {...props}
    >
      <FileCode size={18} />
    </Control>
  );
};

// Advanced Formatting
export { LinkControl } from "./LinkControl";

export const ColorControl = (props: ControlProps) => {
  const { editor } = useTiptapEditorContext();
  const [open, setOpen] = useState(false);

  const currentColor = editor?.getAttributes("textStyle").color;

  const handleColorChange = (color: string) => {
    if (color) {
      editor?.chain().focus().setColor(color).run();
    } else {
      editor?.chain().focus().unsetColor().run();
    }
    setOpen(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Control
          isActive={!!currentColor}
          title="Text Color"
          {...props}
        >
          <div className="te-flex te-flex-col te-items-center te-justify-center te-relative">
            <Palette size={16} />
            <div 
                className="te-h-[3px] te-w-full te-absolute te-bottom-[-2px] te-rounded-full" 
                style={{ backgroundColor: currentColor || 'transparent' }}
            />
          </div>
        </Control>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="te-z-[100] te-mt-1 te-shadow-lg te-border te-border-editor-border te-bg-editor-toolbar te-rounded te-outline-none te-animate-in te-fade-in te-zoom-in-95"
          sideOffset={5}
          align="start"
          onFocusOutside={(e) => e.preventDefault()}
        >
          <ColorPicker
            color={currentColor}
            onChange={handleColorChange}
            storageKey="tiptap-recent-colors-text"
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export const HighlightControl = (props: ControlProps) => {
  const { editor } = useTiptapEditorContext();
  const [open, setOpen] = useState(false);

  const currentHighlight = editor?.getAttributes("highlight").color;

  const handleColorChange = (color: string) => {
    if (color) {
      editor?.chain().focus().setHighlight({ color }).run();
    } else {
      editor?.chain().focus().unsetHighlight().run();
    }
    setOpen(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Control
          isActive={!!currentHighlight}
          title="Highlight Color"
          {...props}
        >
           <div className="te-flex te-flex-col te-items-center te-justify-center te-relative">
            <Highlighter size={16} />
            <div 
                className="te-h-[3px] te-w-full te-absolute te-bottom-[-2px] te-rounded-full" 
                style={{ backgroundColor: currentHighlight || 'transparent' }}
            />
          </div>
        </Control>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="te-z-[100] te-mt-1 te-shadow-lg te-border te-border-editor-border te-bg-editor-toolbar te-rounded te-outline-none te-animate-in te-fade-in te-zoom-in-95"
          sideOffset={5}
          align="start"
          onFocusOutside={(e) => e.preventDefault()}
        >
          <ColorPicker
            color={currentHighlight}
            onChange={handleColorChange}
            storageKey="tiptap-recent-colors-highlight"
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

interface PresetOption {
    label: string;
    value: number;
    bgcolor?: string;
    color?: string;
    divider?: boolean;
}

const HIGHLIGHT_PRESETS: PresetOption[] = [
    { label: 'Yellow Background', value: 1, bgcolor: '#ffff8a' },
    { label: 'Green Background', value: 2, bgcolor: '#a7ffa7' },
    { label: 'Purple Background', value: 3, bgcolor: '#e6afff' },
    { label: 'Blue Background', value: 4, bgcolor: '#83d3ff', divider: true },
    { label: 'Red Text', value: 5, color: '#e71313' },
    { label: 'Green Text', value: 6, color: '#128a00', divider: true },
];

export const HighlightPresetControl = (props: ControlProps) => {
    const { editor } = useTiptapEditorContext();
    
    const handleSelect = (item: PresetOption) => {
        if (item.bgcolor) {
            editor?.chain().focus().setHighlight({ color: item.bgcolor }).run();
        }
        if (item.color) {
            editor?.chain().focus().setColor(item.color).run();
        }
    };
    
    const handleClear = () => {
        editor?.chain().focus().unsetHighlight().run();
        editor?.chain().focus().unsetColor().run();
    };

    return (
     <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Control title="Highlight Presets" {...props}>
             <div className="te-flex te-items-center te-justify-center te-font-bold te-text-lg">
                A
            </div>
        </Control>
      </DropdownMenu.Trigger>

       <DropdownMenu.Portal>
          <DropdownMenu.Content
             className="te-z-[100] te-min-w-[180px] te-bg-editor-toolbar te-rounded-md te-border te-border-editor-border te-p-1 te-shadow-md te-animate-in te-fade-in te-zoom-in-95"
             sideOffset={5}
             align="start"
          >
            {HIGHLIGHT_PRESETS.map((preset) => (
                <div key={preset.value}>
                    <DropdownMenu.Item
                        className="te-relative te-flex te-cursor-pointer te-select-none te-items-center te-rounded-sm te-px-2 te-py-1.5 te-text-sm te-outline-none focus:te-bg-editor-bg-hover data-[disabled]:te-pointer-events-none data-[disabled]:te-opacity-50"
                        onSelect={() => handleSelect(preset)}
                    >
                         <div 
                            className="te-flex te-items-center te-justify-center te-w-6 te-h-6 te-mr-2 te-rounded"
                            style={{ 
                                backgroundColor: preset.bgcolor || 'transparent',
                                color: preset.color || 'inherit', 
                                border: '1px solid var(--editor-border)',
                            }}
                         >
                            <Highlighter size={14} />
                         </div>
                        {preset.label}
                    </DropdownMenu.Item>
                    {preset.divider && <DropdownMenu.Separator className="te-my-1 te-h-px te-bg-editor-border" />}
                </div>
            ))}
             <DropdownMenu.Separator className="te-my-1 te-h-px te-bg-editor-border" />
             <DropdownMenu.Item
                 className="te-relative te-flex te-cursor-pointer te-select-none te-items-center te-rounded-sm te-px-2 te-py-1.5 te-text-sm te-outline-none focus:te-bg-editor-bg-hover te-text-red-500"
                 onSelect={handleClear}
             >
                <div className="te-w-6 te-mr-2 te-flex te-items-center te-justify-center">
                    <RemoveFormatting size={14} />
                </div>
                Clear Formatting
             </DropdownMenu.Item>
          </DropdownMenu.Content>
       </DropdownMenu.Portal>
     </DropdownMenu.Root>
    );
};

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
  Link as LinkIcon,
  Highlighter,
  Palette,
} from "lucide-react";

import { useTiptapEditorContext } from "../TiptapEditorContext";
import { Control, type ControlProps } from "./Control";

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
  return (
    <Control
      onClick={() =>
        editor
          ?.chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run()
      }
      title="Insert Table"
      {...props}
    >
      <TableIcon size={18} />
    </Control>
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
export const LinkControl = (props: ControlProps) => {
  const { editor } = useTiptapEditorContext();
  return (
    <Control
      onClick={() => {
        const previousUrl = editor?.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

        if (url === null) {
          return;
        }

        if (url === "") {
          editor?.chain().focus().extendMarkRange("link").unsetLink().run();
          return;
        }

        editor
          ?.chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: url })
          .run();
      }}
      isActive={editor?.isActive("link")}
      title="Link"
      {...props}
    >
      <LinkIcon size={18} />
    </Control>
  );
};

export const ColorControl = (props: ControlProps) => {
  const { editor } = useTiptapEditorContext();
  return (
    <Control
      onClick={() => {
        const color = window.prompt("Color (hex or name)", editor?.getAttributes("textStyle").color);
        if (color) {
            editor?.chain().focus().setColor(color).run();
        } else if (color === "") {
            editor?.chain().focus().unsetColor().run();
        }
      }}
       isActive={!!editor?.getAttributes("textStyle").color}
      title="Text Color"
      {...props}
    >
      <Palette size={18} style={{ color: editor?.getAttributes("textStyle").color }} />
    </Control>
  );
};

export const HighlightControl = (props: ControlProps) => {
  const { editor } = useTiptapEditorContext();
  return (
    <Control
      onClick={() => editor?.chain().focus().toggleHighlight().run()}
      isActive={editor?.isActive("highlight")}
      title="Highlight"
      {...props}
    >
      <Highlighter size={18} />
    </Control>
  );
};

import React, { useState, useEffect } from "react";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { TableRow } from "@tiptap/extension-table-row";
import Table from "../../extensions/table";
import TableCell from "../../extensions/table/cell";
import TableHeader from "../../extensions/table/header";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { ReactNodeViewRenderer, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";

import { cn } from "../../utils/cn";
import { TiptapEditorContext } from "./TiptapEditorContext";
import { TiptapEditorContent } from "./TiptapEditorContent";
import {
  TiptapEditorToolbar,
  TiptapEditorControlsGroup,
} from "./TiptapEditorToolbar";
import { TableBubbleMenu } from "./TableBubbleMenu";
import { ImageResizer } from "./extensions/ImageResizer";
import { Control } from "./controls/Control";
import {
  BoldControl,
  ItalicControl,
  UnderlineControl,
  StrikeControl,
  CodeControl,
  ClearFormattingControl,
  H1Control,
  H2Control,
  H3Control,
  BlockquoteControl,
  AlignLeftControl,
  AlignCenterControl,
  AlignRightControl,
  AlignJustifyControl,
  BulletListControl,
  OrderedListControl,
  UndoControl,
  RedoControl,
  ImageControl,
  TableControl,
  SourceControl,
  LinkControl,
  ColorControl,
  HighlightControl,
  HighlightPresetControl,
} from "./controls";

export interface TiptapEditorProps {
  content?: string;
  placeholder?: string;
  onChange?: (html: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
  readOnly?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const TiptapEditorRoot: React.FC<TiptapEditorProps> = ({
  content,
  placeholder,
  onChange,
  onImageUpload,
  readOnly = false,
  children,
  className,
  style,
}) => {
  const [isSourceMode, setIsSourceMode] = useState(false);
  const [version, setVersion] = useState(0);

  const onChangeTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const editor = useEditor(
    {
      immediatelyRender: false,
      extensions: [
        // ... (extensions keep same)
        StarterKit,
        Placeholder.configure({
          placeholder: placeholder || "Write something...",
        }),
        Underline,
        Link.configure({
          openOnClick: false,
          autolink: true,
        }),
        TextStyle,
        Color,
        Highlight.configure({
          multicolor: true,
        }),
        Image.configure({
          inline: true,
          allowBase64: true,
        }).extend({
          addNodeView() {
            return ReactNodeViewRenderer(ImageResizer);
          },
        }),
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
      ],
      editorProps: {
        // ... (editorProps keep same)
        handlePaste: (view, event) => {
          if (!event.clipboardData?.files.length) {
            return false;
          }

          const files = Array.from(event.clipboardData.files);
          const images = files.filter((file) => file.type.startsWith("image/"));

          if (images.length === 0) {
            return false;
          }

          event.preventDefault();

          images.forEach(async (image) => {
            try {
              let src: string;
              if (onImageUpload) {
                src = await onImageUpload(image);
              } else {
                src = await new Promise<string>((resolve) => {
                  const reader = new FileReader();
                  reader.onload = (e) => resolve(e.target?.result as string);
                  reader.readAsDataURL(image);
                });
              }

              const { schema } = view.state;
              const imageNode = schema.nodes.image;
              if (imageNode) {
                const node = imageNode.create({ src });
                const transaction = view.state.tr.replaceSelectionWith(node);
                view.dispatch(transaction);
              }
            } catch (error) {
              console.error("Failed to upload/load image:", error);
            }
          });

          return true;
        },
        handleDrop: (view, event, _slice, moved) => {
          if (
            !moved &&
            event.dataTransfer &&
            event.dataTransfer.files &&
            event.dataTransfer.files.length > 0
          ) {
            const files = Array.from(event.dataTransfer.files);
            const images = files.filter((file) =>
              file.type.startsWith("image/"),
            );

            if (images.length > 0) {
              event.preventDefault();

              const coordinates = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              });

              images.forEach(async (image) => {
                try {
                  let src: string;
                  if (onImageUpload) {
                    src = await onImageUpload(image);
                  } else {
                    src = await new Promise<string>((resolve) => {
                      const reader = new FileReader();
                      reader.onload = (e) =>
                        resolve(e.target?.result as string);
                      reader.readAsDataURL(image);
                    });
                  }

                  if (coordinates) {
                    const { schema } = view.state;
                    const imageNode = schema.nodes.image;
                    if (imageNode) {
                      const node = imageNode.create({ src });
                      const transaction = view.state.tr.insert(
                        coordinates.pos,
                        node,
                      );
                      view.dispatch(transaction);
                    }
                  }
                } catch (error) {
                  console.error("Failed to upload/load image:", error);
                }
              });
              return true;
            }
          }
          return false;
        },
      },
      content,
      editable: !readOnly,
      onUpdate: ({ editor }) => {
        if (onChange) {
          if (onChangeTimerRef.current) {
            clearTimeout(onChangeTimerRef.current);
          }
          // Debounce the HTML conversion and onChange call
          onChangeTimerRef.current = setTimeout(() => {
            const html = editor.getHTML();
            onChange(html);
          }, 300);
        }
      },
    },
    [],
  );

  useEffect(() => {
    return () => {
      if (onChangeTimerRef.current) {
        clearTimeout(onChangeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!editor) return;

    let lastTransactionTime = 0;
    const THROTTLE_MS = 150; // Sync toolbar states at most every 150ms during typing

    const handleTransaction = () => {
      const now = Date.now();
      if (now - lastTransactionTime > THROTTLE_MS) {
        setVersion((v) => v + 1);
        lastTransactionTime = now;
      }
    };

    editor.on("transaction", handleTransaction);

    return () => {
      editor.off("transaction", handleTransaction);
    };
  }, [editor]);

  return (
    <TiptapEditorContext.Provider
      value={{
        editor,
        isSourceMode,
        toggleSourceMode: () => setIsSourceMode((prev) => !prev),
        isReadOnly: readOnly,
        initialContent: content,
        version,
      }}
    >
      <div
        className={cn(
          "te-editor-root te-rounded te-border te-border-solid te-border-editor-border te-w-full te-flex te-flex-col te-bg-editor-bg te-overflow-hidden focus-within:te-border-editor-border-focus",
          className,
        )}
        style={style}
      >
        {children}
      </div>
    </TiptapEditorContext.Provider>
  );
};

export const TiptapEditor = Object.assign(TiptapEditorRoot, {
  Content: TiptapEditorContent,
  Toolbar: TiptapEditorToolbar,
  ControlsGroup: TiptapEditorControlsGroup,
  Control: Control,

  Bold: BoldControl,
  Italic: ItalicControl,
  Underline: UnderlineControl,
  Strike: StrikeControl,
  Code: CodeControl,
  ClearFormatting: ClearFormattingControl,

  H1: H1Control,
  H2: H2Control,
  H3: H3Control,
  Blockquote: BlockquoteControl,

  AlignLeft: AlignLeftControl,
  AlignCenter: AlignCenterControl,
  AlignRight: AlignRightControl,
  AlignJustify: AlignJustifyControl,

  BulletList: BulletListControl,
  OrderedList: OrderedListControl,

  Undo: UndoControl,
  Redo: RedoControl,

  Image: ImageControl,
  Table: TableControl,
  Source: SourceControl,
  Link: LinkControl,
  Color: ColorControl,
  Highlight: HighlightControl,
  HighlightPreset: HighlightPresetControl,
  TableBubbleMenu: TableBubbleMenu,
});

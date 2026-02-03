import type { Editor } from "@tiptap/react";
import { createContext, useContext } from "react";

export interface TiptapEditorContextValue {
  editor: Editor | null;
  isSourceMode: boolean;
  toggleSourceMode: () => void;
  isReadOnly: boolean;
  initialContent?: string;
  version: number;
}

export const TiptapEditorContext = createContext<TiptapEditorContextValue | null>(
  null,
);

export const useTiptapEditorContext = () => {
  const context = useContext(TiptapEditorContext);
  if (!context) {
    throw new Error(
      "useTiptapEditorContext must be used within a TiptapEditor provider",
    );
  }
  return context;
};

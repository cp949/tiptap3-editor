import { TiptapEditor, type TiptapEditorProps } from "../editor/TiptapEditor";

export const RichEditor = (props: TiptapEditorProps) => {
  return (
    <TiptapEditor {...props}>
      <TiptapEditor.Toolbar>
        <TiptapEditor.ControlsGroup>
          <TiptapEditor.Undo />
          <TiptapEditor.Redo />
        </TiptapEditor.ControlsGroup>

        <TiptapEditor.ControlsGroup>
          <TiptapEditor.H1 />
          <TiptapEditor.H2 />
          <TiptapEditor.H3 />
        </TiptapEditor.ControlsGroup>

        <TiptapEditor.ControlsGroup>
          <TiptapEditor.Bold />
          <TiptapEditor.Italic />
          <TiptapEditor.Underline />
          <TiptapEditor.Strike />
          <TiptapEditor.Code />
          <TiptapEditor.Highlight />
          <TiptapEditor.Color />
          <TiptapEditor.ClearFormatting />
        </TiptapEditor.ControlsGroup>

        <TiptapEditor.ControlsGroup>
          <TiptapEditor.AlignLeft />
          <TiptapEditor.AlignCenter />
          <TiptapEditor.AlignRight />
          <TiptapEditor.AlignJustify />
        </TiptapEditor.ControlsGroup>

        <TiptapEditor.ControlsGroup>
          <TiptapEditor.BulletList />
          <TiptapEditor.OrderedList />
          <TiptapEditor.Blockquote />
        </TiptapEditor.ControlsGroup>

        <TiptapEditor.ControlsGroup>
          <TiptapEditor.Link />
          <TiptapEditor.Image />
          <TiptapEditor.Table />
        </TiptapEditor.ControlsGroup>

        <TiptapEditor.ControlsGroup>
           <TiptapEditor.Source />
        </TiptapEditor.ControlsGroup>
      </TiptapEditor.Toolbar>
      
      <TiptapEditor.TableBubbleMenu />
      <TiptapEditor.Content />
    </TiptapEditor>
  );
};

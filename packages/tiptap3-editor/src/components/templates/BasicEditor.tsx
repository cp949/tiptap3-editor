import { TiptapEditor, type TiptapEditorProps } from "../editor/TiptapEditor";

export const BasicEditor = (props: TiptapEditorProps) => {
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
        </TiptapEditor.ControlsGroup>
        
        <TiptapEditor.ControlsGroup>
            <TiptapEditor.BulletList />
            <TiptapEditor.OrderedList />
        </TiptapEditor.ControlsGroup>
      </TiptapEditor.Toolbar>
      <TiptapEditor.Content />
    </TiptapEditor>
  );
};

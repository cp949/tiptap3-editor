

import { TiptapEditor } from "./TiptapEditor";

export const DefaultToolbar = () => {
  return (
    <TiptapEditor.Toolbar>
      {/* Group 1: History */}
      <TiptapEditor.ControlsGroup>
        <TiptapEditor.Undo />
        <TiptapEditor.Redo />
      </TiptapEditor.ControlsGroup>

      {/* Group 2: Typography */}
      <TiptapEditor.ControlsGroup>
        <TiptapEditor.Bold />
        <TiptapEditor.Italic />
        <TiptapEditor.Underline />
        <TiptapEditor.Strike />
        <TiptapEditor.Code />
        <TiptapEditor.ClearFormatting />
        <TiptapEditor.Color />
        <TiptapEditor.Highlight />
      </TiptapEditor.ControlsGroup>

      {/* Group 3: Headings */}
      <TiptapEditor.ControlsGroup>
        <TiptapEditor.H1 />
        <TiptapEditor.H2 />
        <TiptapEditor.H3 />
        <TiptapEditor.Blockquote />
      </TiptapEditor.ControlsGroup>

      {/* Group 4: Alignment */}
      <TiptapEditor.ControlsGroup>
        <TiptapEditor.AlignLeft />
        <TiptapEditor.AlignCenter />
        <TiptapEditor.AlignRight />
        <TiptapEditor.AlignJustify />
      </TiptapEditor.ControlsGroup>

      {/* Group 5: Lists */}
      <TiptapEditor.ControlsGroup>
        <TiptapEditor.BulletList />
        <TiptapEditor.OrderedList />
      </TiptapEditor.ControlsGroup>

      {/* Group 6: Inserts */}
      <TiptapEditor.ControlsGroup>
        <TiptapEditor.Image />
        <TiptapEditor.Table />
        <TiptapEditor.Link />
      </TiptapEditor.ControlsGroup>

      {/* Group 7: Source */}
      <TiptapEditor.Source />
    </TiptapEditor.Toolbar>
  );
};

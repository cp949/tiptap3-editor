"use client";

import { BasicEditor } from "@cp949/tiptap3-editor";
import { useState } from "react";
import { OutputPanel } from "../common/OutputPanel";
import Button from "@mui/material/Button";
import { Save } from "lucide-react";

export const SaveButtonExample = () => {
  const [content, setContent] = useState("<p>Type something and click <b>Save</b> to see the output below.</p>");
  const [savedOutput, setSavedOutput] = useState("");

  const handleSave = () => {
    setSavedOutput(content);
  };

  return (
    <div className="te-space-y-8">
      <div className="te-flex te-justify-end te-mb-4">
        <Button 
          variant="contained" 
          startIcon={<Save size={16} />}
          onClick={handleSave}
        >
          Save Content
        </Button>
      </div>

      <div className="te-bg-white">
        <BasicEditor content={content} onChange={setContent} />
      </div>

      {savedOutput && (
        <OutputPanel title="Saved HTML Output" count={savedOutput.length}>
            {savedOutput}
        </OutputPanel>
      )}
    </div>
  );
};

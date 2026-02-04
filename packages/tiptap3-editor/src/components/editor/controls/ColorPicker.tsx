import React, { useState, useEffect } from "react";
import { cn } from "../../../utils/cn";
import { ActionButton } from "./ActionButton";

export interface ColorPickerProps {
  color?: string;
  onChange: (color: string) => void;
  storageKey?: string; // Key for local storage to save recent colors
}

// Umo Editor "Theme Colors" (60 colors)
const THEME_COLORS = [
    "#ffffff", "#000000", "#4A5366", "#3B74EC", "#45A2EF", "#529867", "#CD4A3F", "#EA8D40", "#EEC543", "#8E45D0",
    "#F2F2F2", "#7F7F7F", "#F4F5F7", "#E8F6FE", "#EDFAF2", "#FCEAE9", "#FDF3EC", "#FEF9E5", "#FAECFE",
    "#EEEEEE", "#595959", "#C6CAD2", "#CEEBFD", "#CBDCFC", "#CBE9D7", "#F7CBC9", "#FADDC7", "#FDEEB5", "#EBCAFC",
    "#BFBFBF", "#3F3F3F", "#828B9D", "#A0BEFA", "#A7DCFC", "#A6D5B8", "#F2A19C", "#F5BC8C", "#FBE281", "#CB94F9",
    "#A5A5A5", "#262626", "#363B44", "#2452B2", "#3473A1", "#417A53", "#922B22", "#AD642A", "#9E8329", "#57297D",
    "#939393", "#0D0D0D", "#25272E", "#15316A", "#1C415A", "#284D34", "#511712", "#573213", "#635217", "#36194E"
];

// Umo Editor "Standard Colors"
const STANDARD_COLORS = [
  '#B12318', '#EB3323', '#F6C143', '#FFFE55', '#A0CD63', 
  '#4FAD5B', '#4CAFEA', '#2D70BA', '#06215C', '#68389B'
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange,
  storageKey = 'tiptap-recent-colors',
}) => {
  const [recentColors, setRecentColors] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setRecentColors(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Failed to load standard colors", e);
    }
  }, [storageKey]);

  const handleColorSelect = (selectedColor: string) => {
    onChange(selectedColor);
    
    // Update recent colors
    try {
        const newRecent = [selectedColor, ...recentColors.filter(c => c !== selectedColor)].slice(0, 10);
        setRecentColors(newRecent);
        localStorage.setItem(storageKey, JSON.stringify(newRecent));
    } catch (e) {
        console.warn("Failed to save recent colors", e);
    }
  };

  const handleClear = () => {
    onChange("");
  }

  const renderColorButton = (c: string) => (
    <button
      key={c}
      type="button"
      className={cn(
        "te-w-5 te-h-5 te-rounded-sm te-border te-border-gray-200 hover:te-scale-110 te-transition-transform",
        color === c && "te-ring-2 te-ring-offset-1 te-ring-blue-500"
      )}
      style={{ backgroundColor: c }}
      onClick={() => handleColorSelect(c)}
      title={c}
    />
  );

  return (
    <div className="te-w-64 te-p-3 te-flex te-flex-col te-gap-3">
        {/* Default Button */}
      <ActionButton
        variant="secondary"
        className="te-w-full"
        onClick={handleClear}
      >
        Default Color
      </ActionButton>

      {/* Theme Colors */}
      <div>
         <div className="te-text-xs te-text-editor-fg-muted te-mb-2">Theme Colors</div>
         <div className="te-grid te-grid-cols-10 te-gap-1">
            {THEME_COLORS.map(renderColorButton)}
         </div>
      </div>

      {/* Standard Colors */}
      <div>
        <div className="te-text-xs te-text-editor-fg-muted te-mb-2">Standard Colors</div>
        <div className="te-grid te-grid-cols-10 te-gap-1">
          {STANDARD_COLORS.map(renderColorButton)}
        </div>
      </div>

      {/* Recent Colors */}
      {recentColors.length > 0 && (
        <div>
          <div className="te-text-xs te-text-editor-fg-muted te-mb-2">Recently Used</div>
           <div className="te-flex te-flex-wrap te-gap-1">
            {recentColors.map(renderColorButton)}
          </div>
        </div>
      )}

    </div>
  );
};

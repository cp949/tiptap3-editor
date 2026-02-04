import type React from "react";
import { useState } from "react";
import { cn } from "../../../utils/cn";

export interface TableGridPickerProps {
  onSelect: (rows: number, cols: number) => void;
  maxRows?: number;
  maxCols?: number;
}

export const TableGridPicker: React.FC<TableGridPickerProps> = ({
  onSelect,
  maxRows = 8,
  maxCols = 10,
}) => {
  const [hovered, setHovered] = useState({ rows: 0, cols: 0 });

  const rows = Array.from({ length: maxRows });
  const cols = Array.from({ length: maxCols });

  const isSelected = (r: number, c: number) => {
    return hovered.rows > r && hovered.cols > c;
  };

  return (
    <div className="te-p-2 te-bg-editor-toolbar te-rounded te-shadow-lg te-border te-border-editor-border">
      {/* biome-ignore lint/a11y/noStaticElementInteractions: Mouse leave logic required on container */}
      <div
        className="te-grid te-gap-1"
        style={{
          gridTemplateColumns: `repeat(${maxCols}, 1fr)`,
          width: "max-content",
        }}
        onMouseLeave={() => setHovered({ rows: 0, cols: 0 })}
      >
        {rows.map((_, rowIndex) =>
          cols.map((_, colIndex) => (
            <button
              // biome-ignore lint/suspicious/noArrayIndexKey: Grid indices are stable and unique identifiers here
              key={`${rowIndex}-${colIndex}`}
              type="button"
              className={cn(
                "te-w-4 te-h-4 te-border te-border-solid te-cursor-pointer te-transition-colors",
                isSelected(rowIndex, colIndex)
                  ? "te-border-primary te-bg-primary/20"
                  : "te-border-editor-border hover:te-border-primary",
              )}
              onMouseEnter={() =>
                setHovered({ rows: rowIndex + 1, cols: colIndex + 1 })
              }
              onClick={() => onSelect(rowIndex + 1, colIndex + 1)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(rowIndex + 1, colIndex + 1);
                }
              }}
            />
          )),
        )}
      </div>
      <div className="te-mt-2 te-text-center te-text-xs te-text-editor-text-secondary te-font-medium">
        {hovered.rows > 0 ? `${hovered.rows} x ${hovered.cols}` : "Select size"}
      </div>
    </div>
  );
};

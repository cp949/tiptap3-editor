import { type NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

export const ImageResizer: React.FC<NodeViewProps> = ({
  node,
  updateAttributes,
  selected,
}) => {
  const [width, setWidth] = useState<string | number>(
    node.attrs.width || "auto",
  );
  const resizeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWidth(node.attrs.width || "auto");
  }, [node.attrs.width]);

  return (
    <NodeViewWrapper className="te-inline-block te-relative te-leading-none">
      <div
        ref={resizeRef}
        className={`te-relative te-inline-block ${selected ? "te-ring-2 te-ring-blue-500" : ""}`}
        style={{ width: typeof width === "number" ? `${width}px` : width }}
      >
        <img
          src={node.attrs.src}
          alt={node.attrs.alt}
          className="te-block te-w-full te-h-auto"
        />
        {selected && (
          <button
            type="button"
            className="te-absolute te-bottom-0 te-right-0 te-w-4 te-h-4 te-bg-blue-500 te-cursor-nwse-resize te-z-10 te-border-none te-p-0"
            onMouseDown={(e) => {
              // Use a separate handler for the resize handle
              e.preventDefault();
              e.stopPropagation();

              const startX = e.clientX;
              const startWidth = resizeRef.current?.offsetWidth || 0;

              const onMove = (me: MouseEvent) => {
                const newW = Math.max(50, startWidth + (me.clientX - startX));
                setWidth(newW);
              };

              const onUp = (me: MouseEvent) => {
                const newW = Math.max(50, startWidth + (me.clientX - startX));
                updateAttributes({ width: newW });
                document.removeEventListener("mousemove", onMove);
                document.removeEventListener("mouseup", onUp);
              };

              document.addEventListener("mousemove", onMove);
              document.addEventListener("mouseup", onUp);
            }}
          />
        )}
      </div>
    </NodeViewWrapper>
  );
};

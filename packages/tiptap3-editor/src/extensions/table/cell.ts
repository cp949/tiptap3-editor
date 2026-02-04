import TableCell from "@tiptap/extension-table-cell";

const TableCellOptions = {
  // biome-ignore lint/suspicious/noExplicitAny: Required for library override signature
  addAttributes(): any {
    return {
      // @ts-expect-error
      ...this.parent?.(),
      align: {
        default: null,
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("align") ?? null,
        renderHTML: ({ align }: { align: string }) => ({ align }),
      },
      background: {
        default: null,
        parseHTML: (element: HTMLElement) => {
          const style = element.getAttribute("style") ?? "";
          const match = style.match(/background(?:-color)?:\s*([^;]+)/i);
          return match?.[1] ? match[1].trim() : null;
        },
        renderHTML: ({ background }: { background: string }) => {
          return background ? { style: `background-color: ${background}` } : {};
        },
      },
      color: {
        default: null,
        parseHTML: (element: HTMLElement) => {
          return element.style.color || null;
        },
        renderHTML: ({ color }: { color: string }) => {
          return color ? { style: `color: ${color}` } : {};
        },
      },
      borderColor: {
        default: null,
        parseHTML: (element: HTMLElement) => {
          return (
            element.style.borderColor ||
            element.getAttribute("border-color") ||
            null
          );
        },
        renderHTML: ({ borderColor }: { borderColor: string }) => {
          return borderColor ? { style: `border-color: ${borderColor}` } : {};
        },
      },
    };
  },
};

export default TableCell.extend(TableCellOptions);
export { TableCellOptions };

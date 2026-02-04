import TableCell from '@tiptap/extension-table-cell'

const TableCellOptions = {
  addAttributes(): any {
    return {
      // @ts-ignore
      ...this.parent?.(),
      align: {
        default: null,
        parseHTML: (element: any) => element.getAttribute('align') ?? null,
        renderHTML: ({ align }: any) => ({ align }),
      },
      background: {
        default: null,
        parseHTML: (element: any) => {
          const style = element.getAttribute('style') ?? ''
          const match = style.match(/background(?:-color)?:\s*([^;]+)/i)
          return match ? match[1].trim() : null
        },
        renderHTML: ({ background }: any) => {
          return background ? { style: `background-color: ${background}` } : {}
        },
      },
      color: {
        default: null,
        parseHTML: (element: any) => {
          return element.style.color || null
        },
        renderHTML: ({ color }: any) => {
          return color ? { style: `color: ${color}` } : {}
        },
      },
      borderColor: {
        default: null,
        parseHTML: (element: any) => {
          return element.style.borderColor || element.getAttribute('border-color') || null
        },
        renderHTML: ({ borderColor }: any) => {
          return borderColor ? { style: `border-color: ${borderColor}` } : {}
        },
      },
    }
  },
}

export default TableCell.extend(TableCellOptions)
export { TableCellOptions }

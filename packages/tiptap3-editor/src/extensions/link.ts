import Link from "@tiptap/extension-link";
import { Plugin } from "@tiptap/pm/state";

export interface CustomLinkStorage {
  edit: boolean;
  meta: {
    target?: HTMLElement;
    href?: string;
    pos?: number;
  };
}

const CustomLink = Link.extend({
  addStorage() {
    return {
      edit: false,
      meta: {},
    };
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleClick(view, pos, event) {
            const target = event.target as HTMLElement;
            if (target.tagName === "A" && target.closest(".ProseMirror")) {
              const href = target.getAttribute("href");
              view.dispatch(
                view.state.tr.setMeta("link-click", {
                  target,
                  href,
                  pos,
                }),
              );
              return true;
            }
            return false;
          },
        },
      }),
    ];
  },
  onTransaction({ transaction }) {
    const meta = transaction.getMeta("link-click");
    if (meta) {
      this.storage.edit = true;
      this.storage.meta = meta;
    } else if (transaction.selectionSet) {
      // Auto close when selection changes (optional, but good UX)
      // Umo might handle this in Vue effect, but here we can do it in storage
      // Let's stick to Umo's logic: Umo clears it in onHide of tippy
    }
  },
});

export default CustomLink;

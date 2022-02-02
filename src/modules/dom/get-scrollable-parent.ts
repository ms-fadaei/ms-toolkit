export default function getScrollableParent(el: HTMLElement): HTMLElement {
  let parent = el.parentElement;

  while (parent) {
    if (parent.scrollHeight > parent.clientHeight) {
      return parent;
    }

    parent = parent.parentElement;
  }

  return document.documentElement;
}

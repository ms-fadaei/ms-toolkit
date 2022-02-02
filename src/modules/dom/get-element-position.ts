export default function getElementPosition(el: HTMLElement) {
  if (!el || !(el instanceof HTMLElement)) {
    throw new Error('Element is not defined');
  }

  const elementRect = el.getBoundingClientRect();

  return {
    width: elementRect.width,
    height: elementRect.height,
    left: elementRect.left,
    top: elementRect.top,
    scrollX: elementRect.left + window.scrollX,
    scrollY: elementRect.top + window.scrollY,
  };
}

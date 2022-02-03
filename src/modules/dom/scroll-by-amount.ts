import { supportsNativeSmoothScroll } from './utilities';

export default function scrollByAmount(el: HTMLElement, left: number, top: number): void {
  if (supportsNativeSmoothScroll) {
    el.scrollBy({
      left,
      top,
      behavior: 'smooth',
    });
  } else {
    el.scrollBy(left, top);
  }
}

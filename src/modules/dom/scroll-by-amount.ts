import { supportsNativeSmoothScroll } from './utilities';

export default function scrollByAmount(el: HTMLElement, left = 0, top = 0): void {
  if (!('scrollBy' in el)) {
    console.error('scrollBy is not supported');
    return;
  }

  if (supportsNativeSmoothScroll) {
    el.scrollBy({
      left,
      top,
      behavior: 'smooth',
    });
  } else {
    el.scrollBy(left || 0, top || 0);
  }
}

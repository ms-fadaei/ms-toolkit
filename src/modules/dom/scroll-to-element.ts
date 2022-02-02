import { supportsNativeSmoothScroll } from './utilities';

export interface scrollToElementOptions {
  x?: 'start' | 'center' | 'end';
  y?: 'start' | 'center' | 'end';
  marginX?: number;
  marginY?: number;
}

export default function scrollToElement(
  el: HTMLElement,
  parentEl: HTMLElement,
  options?: scrollToElementOptions,
): void {
  const { x = 'center', y = 'center', marginX = 0, marginY = 0 } = options || {};

  let offsetLeft = 0;
  if (x === 'start') {
    offsetLeft = el.offsetLeft + el.clientWidth - parentEl.clientWidth + marginX;
  } else if (x === 'end') {
    offsetLeft = el.offsetLeft - marginX;
  } else {
    offsetLeft = el.offsetLeft + el.clientWidth / 2 - parentEl.clientWidth / 2;
  }

  let offsetTop = 0;
  if (y === 'start') {
    offsetTop = el.offsetTop - marginY;
  } else if (y === 'end') {
    offsetTop = el.offsetTop + el.clientHeight - parentEl.clientHeight + marginY;
  } else {
    offsetTop = el.offsetTop + el.clientHeight / 2 - parentEl.clientHeight / 2;
  }

  if (supportsNativeSmoothScroll) {
    parentEl.scrollTo({
      top: offsetTop,
      left: offsetLeft,
      behavior: 'smooth',
    });
  } else {
    parentEl.scrollTo(offsetLeft, offsetTop);
  }
}

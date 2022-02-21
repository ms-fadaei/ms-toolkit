import getElementPosition from './get-element-position';
import { supportsNativeSmoothScroll } from './utilities';

export default function scrollWindowToSection(
  el?: HTMLElement | string,
  options?: { marginTop?: number },
): void {
  // eslint-disable-next-line prettier/prettier
  const element = (typeof el === 'string' ? document.querySelector(el) : el) || window.document.body;
  const { marginTop = 0 } = options || {};

  let offsetTop = getElementPosition(element as HTMLElement).scrollY - marginTop;
  offsetTop = offsetTop < 0 ? 0 : offsetTop;

  if (supportsNativeSmoothScroll) {
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    });
  } else {
    window.scrollTo(0, offsetTop);
  }
}

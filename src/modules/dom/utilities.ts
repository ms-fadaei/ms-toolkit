export const supportsNativeSmoothScroll =
  typeof window !== 'undefined' && 'scrollBehavior' in document.documentElement.style;

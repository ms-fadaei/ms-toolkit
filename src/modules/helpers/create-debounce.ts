type FunctionType = (...args: unknown[]) => void;

/**
 * Create debouncing function
 * @param cb callback function that you want to debounce
 * @param delay debounce delay in milliseconds
 * @param immediate if true, the callback will be called immediately
 * @returns debounced function
 */
export default function createDebounce(
  cb: FunctionType,
  delay: number,
  immediate = false,
): FunctionType {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function (this: unknown, ...args: unknown[]): void {
    const boundedCb = cb.bind(this, ...args);

    const doAfterTimeout = (): void => {
      if (!immediate) boundedCb();
      timer = null;
    };

    const callItNow = immediate && !timer;

    // clear previous timer if setted already
    if (timer) clearTimeout(timer);

    // set new timer
    timer = setTimeout(doAfterTimeout, delay);

    callItNow && boundedCb();
  };
}

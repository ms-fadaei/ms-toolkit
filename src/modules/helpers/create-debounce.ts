type FunctionType = (...args: unknown[]) => void;

export default function createDebounce(
  this: unknown,
  fn: FunctionType,
  delay: number,
  immediate: boolean,
): FunctionType {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: unknown[]): void => {
    const boundedCb = fn.bind(this, ...args);

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

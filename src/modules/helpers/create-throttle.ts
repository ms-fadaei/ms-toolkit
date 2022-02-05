type FunctionType = (...args: unknown[]) => void;

/**
 * Create throttling function
 * @param cb callback function that you want to throttle
 * @param delay throttle delay in milliseconds
 * @param leading if true, the callback will be called on the leading edge of the timeout
 * @returns throttled function
 */
export default function createThrottle(
  cb: FunctionType,
  delay = -1,
  leading = false,
): FunctionType {
  // throttle flag to prevent run
  let isThrottling = false;

  return function (this: unknown, ...args: unknown[]): void {
    if (!isThrottling) {
      const boundedCb = cb.bind(this, ...args);

      const doAfterTimeout = (): void => {
        if (!leading) boundedCb();
        isThrottling = false;
      };

      if (delay < 0) {
        // use requestAnimationFrame for negative delay
        requestAnimationFrame(doAfterTimeout);
      } else {
        // use setTimeout for positive delay
        setTimeout(doAfterTimeout, delay);
      }

      isThrottling = true;

      // call immediately if leading is enabled
      leading && boundedCb();
    }
  };
}

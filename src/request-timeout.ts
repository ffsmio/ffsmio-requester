import { Timeout } from "./types";

export type RequestTimeoutCallback = () => void;
export type RequestTimeoudIds = {
  r: number | null;
  s: Timeout | null;
};

/**
 * Creates a timeout that uses requestAnimationFrame for better performance when available.
 * Falls back to setTimeout in environments where requestAnimationFrame is not available (e.g., Node.js).
 * 
 * @param callback - The function to execute after the delay
 * @param delay - The delay in milliseconds before executing the callback. Defaults to 0 if not provided or negative.
 * @returns An object containing the timeout IDs object and a cancel function
 * 
 * @example
 * ```typescript
 * // Basic usage
 * const timeout = requestTimeout(() => {
 *   console.log('Executed after 1 second');
 * }, 1000);
 * 
 * // Cancel the timeout
 * timeout.cancel();
 * 
 * // Access timeout IDs
 * console.log('RequestAnimationFrame ID:', timeout.ids.r);
 * console.log('SetTimeout ID:', timeout.ids.s);
 * 
 * // Immediate execution (delay = 0)
 * const immediate = requestTimeout(() => {
 *   console.log('Executed on next animation frame or immediately');
 * });
 * ```
 */
export function requestTimeout(callback: RequestTimeoutCallback, delay?: number) {
  const ids: RequestTimeoudIds = {
    r: null,
    s: null,
  };
  const timeout = Math.max(0, delay || 0);

  function cancel() {
    ids.r && cancelAnimationFrame(ids.r);
    ids.s && clearTimeout(ids.s);
    ids.r = null;
    ids.s = null;
  }

  if (typeof requestAnimationFrame === "function") {
    ids.r = requestAnimationFrame(() => {
      ids.s = setTimeout(() => {
        callback();
        cancel();
      }, timeout);
    });
  } else {
    ids.s = setTimeout(() => {
      callback();
      cancel();
    }, timeout);
  }

  return {
    ids,
    cancel,
  };
}

/**
 * Return type of the requestTimeout function.
 * Contains the timeout IDs object (with requestAnimationFrame and setTimeout IDs) and cancel function.
 */
export type RequestTimeout = ReturnType<typeof requestTimeout>;

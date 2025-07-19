import { Timeout } from "./types";

export type RequestTimeoutCallback = () => void;

/**
 * Creates a timeout that uses requestAnimationFrame for better performance when available.
 * Falls back to setTimeout in environments where requestAnimationFrame is not available (e.g., Node.js).
 * 
 * @param callback - The function to execute after the delay
 * @param delay - The delay in milliseconds before executing the callback. Defaults to 0 if not provided or negative.
 * @returns An object containing the request ID, timeout ID, and a cancel function
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
 * // Immediate execution (delay = 0)
 * const immediate = requestTimeout(() => {
 *   console.log('Executed on next animation frame or immediately');
 * });
 * ```
 */
export function requestTimeout(callback: RequestTimeoutCallback, delay?: number) {
  let rid: number | null = null;
  let sid: Timeout | null = null;
  const timeout = Math.max(0, delay || 0);

  function cancel() {
    rid && cancelAnimationFrame(rid);
    sid && clearTimeout(sid);
    rid = null;
    sid = null;
  }

  if (typeof requestAnimationFrame === "function") {
    rid = requestAnimationFrame(() => {
      sid = setTimeout(() => {
        callback();
        cancel();
      }, timeout);
    });
  } else {
    sid = setTimeout(() => {
      callback();
      cancel();
    }, timeout);
  }

  return {
    rid,
    sid,
    cancel,
  };
}

/**
 * Return type of the requestTimeout function.
 * Contains the request animation frame ID, setTimeout ID, and cancel function.
 */
export type RequestTimeout = ReturnType<typeof requestTimeout>;

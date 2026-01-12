import { noop } from '@barso/helpers';
import { useCallback, useEffect, useMemo, useRef, useSyncExternalStore } from 'react';

/**
 * @typedef {Object} UseMediaQueryOptions
 * @property {number} [debounceMs] - Delay in ms before updating the state.
 * @property {boolean | (() => boolean)} [fallback=false] - Initial state used during SSR and hydration.
 * @property {(matches: boolean) => void} [onChange] - Callback fired when the query match state changes.
 */

/**
 * A robust React hook to monitor media queries, optimized for Next.js and React 18+.
 * @param {string} query - The media query string to monitor (e.g., '(max-width: 768px)').
 * @param {UseMediaQueryOptions} [options] - Optional configuration for debounce, SSR fallback, and change events.
 * @returns {boolean} - Returns true if the media query matches, false otherwise.
 */
export function useMediaQuery(query, { debounceMs, fallback = false, onChange } = {}) {
  const getServerSnapshot = () => (typeof fallback === 'function' ? fallback() : fallback);

  const mql = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return { matches: getServerSnapshot(), isFallback: true };
    }

    return window.matchMedia(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const timeoutRef = useRef();

  const subscribe = useCallback(
    (notify) => {
      if (mql.isFallback) return noop;

      const handleChange = () => {
        if (!debounceMs) return notify();

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(notify, debounceMs);
      };

      if (!mql.addEventListener) {
        mql.addListener?.(handleChange);
        return () => {
          mql.removeListener?.(handleChange);
          clearTimeout(timeoutRef.current);
        };
      }

      mql.addEventListener('change', handleChange);

      return () => {
        mql.removeEventListener('change', handleChange);
        clearTimeout(timeoutRef.current);
      };
    },
    [debounceMs, mql],
  );

  const getSnapshot = () => mql.matches;

  const matches = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const lastValueRef = useRef(matches);

  useEffect(() => {
    if (typeof onChange !== 'function' || matches === lastValueRef.current) return;

    lastValueRef.current = matches;
    onChange(matches);
  }, [matches, onChange]);

  return matches;
}

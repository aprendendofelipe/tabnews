import { act, renderHook } from '@testing-library/react';
import { renderToString } from 'react-dom/server';

import { useMediaQuery } from './index.js';

describe('useMediaQuery', () => {
  describe('renderHook', () => {
    let matches = false;
    const listeners = new Set();

    beforeAll(() => {
      vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
        get matches() {
          return matches;
        },
        media: query,
        addEventListener: (event, cb) => listeners.add(cb),
        removeEventListener: (event, cb) => listeners.delete(cb),
      }));
    });

    beforeEach(() => {
      vi.useFakeTimers();
      matches = false;
      listeners.clear();
    });

    afterAll(() => {
      vi.restoreAllMocks();
    });

    it('should return true if the media query matches', () => {
      matches = true;
      const { result } = renderHook(() => useMediaQuery('(min-width: 600px)'));
      expect(result.current).toBe(true);
    });

    it('should return false if the media query does not match', () => {
      const { result } = renderHook(() => useMediaQuery('(min-width: 1200px)'));
      expect(result.current).toBe(false);
    });

    it('should update when the media query changes', () => {
      const { result } = renderHook(() => useMediaQuery('(min-width: 800px)'));
      expect(result.current).toBe(false);

      act(() => {
        matches = true;
        listeners.forEach((cb) => cb());
      });

      expect(result.current).toBe(true);
    });

    it('should handle debounce correctly', async () => {
      const { result } = renderHook(() => useMediaQuery('(max-width: 768px)', { debounceMs: 100 }));

      act(() => {
        matches = true;
        listeners.forEach((cb) => cb());
      });

      expect(result.current).toBe(false);
      await act(() => vi.advanceTimersByTimeAsync(100));
      expect(result.current).toBe(true);
    });

    it('should call onChange when media query changes', () => {
      const onChange = vi.fn();

      renderHook(() => useMediaQuery('(max-width: 768px)', { onChange }));

      act(() => {
        matches = true;
        listeners.forEach((cb) => cb());
      });

      expect(onChange).toHaveBeenCalledExactlyOnceWith(true);
    });

    it('should cleanup listeners on unmount', () => {
      const { unmount } = renderHook(() => useMediaQuery('(min-width: 800px)'));
      expect(listeners.size).toBe(1);

      unmount();
      expect(listeners.size).toBe(0);
    });

    it('should cleanup debounce timers on unmount', () => {
      const { unmount } = renderHook(() => useMediaQuery('(max-width: 768px)', { debounceMs: 100 }));

      act(() => {
        matches = true;
        listeners.forEach((cb) => cb());
      });
      expect(vi.getTimerCount()).toBe(1);

      unmount();
      expect(vi.getTimerCount()).toBe(0);
    });

    describe('legacy addListener/removeListener support', () => {
      beforeAll(() => {
        window.matchMedia.mockImplementation((query) => ({
          get matches() {
            return matches;
          },
          media: query,
          addListener: (cb) => listeners.add(cb),
          removeListener: (cb) => listeners.delete(cb),
        }));
      });

      it('should matches and update correctly using legacy methods', () => {
        const { result } = renderHook(() => useMediaQuery('(min-width: 900px)'));
        expect(result.current).toBe(false);

        act(() => {
          matches = true;
          listeners.forEach((cb) => cb());
        });
        expect(result.current).toBe(true);
      });

      it('should cleanup listeners on unmount', () => {
        const { unmount } = renderHook(() => useMediaQuery('(min-width: 800px)'));
        expect(listeners.size).toBe(1);

        unmount();
        expect(listeners.size).toBe(0);
      });

      it('should cleanup debounce timers on unmount', () => {
        const { unmount } = renderHook(() => useMediaQuery('(max-width: 768px)', { debounceMs: 100 }));

        act(() => {
          matches = true;
          listeners.forEach((cb) => cb());
        });
        expect(vi.getTimerCount()).toBe(1);

        unmount();
        expect(vi.getTimerCount()).toBe(0);
      });
    });
  });

  describe('SSR', () => {
    let originalWindow;

    beforeAll(() => {
      originalWindow = global.window;
      delete global.window;
    });

    afterAll(() => {
      global.window = originalWindow;
    });

    it('should default to false when no fallback is provided', () => {
      const TestComponent = () => String(useMediaQuery('(min-width: 600px)'));
      expect(renderToString(<TestComponent />)).toBe('false');
    });

    it('should use the constant boolean provided as fallback', () => {
      const TestComponent = () => String(useMediaQuery('(max-width: 768px)', { fallback: true }));
      expect(renderToString(<TestComponent />)).toBe('true');
    });

    it.each([true, false])('should execute the fallback function and use its return value (%s)', (fallbackValue) => {
      const TestComponent = () => String(useMediaQuery('(max-width: 768px)', { fallback: () => fallbackValue }));
      expect(renderToString(<TestComponent />)).toBe(String(fallbackValue));
    });
  });

  describe('when window.matchMedia is not available', () => {
    let originalMatchMedia;

    beforeAll(() => {
      originalMatchMedia = window.matchMedia;
      delete window.matchMedia;
    });

    afterAll(() => {
      window.matchMedia = originalMatchMedia;
    });

    it('should return false when no fallback is provided', () => {
      const { result } = renderHook(() => useMediaQuery('(min-width: 600px)'));
      expect(result.current).toBe(false);
    });

    it('should return the fallback value', () => {
      const { result } = renderHook(() => useMediaQuery('(min-width: 600px)', { fallback: true }));
      expect(result.current).toBe(true);
    });
  });
});

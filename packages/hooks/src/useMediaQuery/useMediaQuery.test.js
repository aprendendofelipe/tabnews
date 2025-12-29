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
      matches = false;
      listeners.clear();
    });

    afterAll(() => {
      window.matchMedia.mockRestore();
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
  });

  describe('SSR', () => {
    it('should not throw during SSR and return false', () => {
      const TestComponent = () => String(useMediaQuery('(min-width: 600px)'));
      expect(renderToString(<TestComponent />)).toBe('false');
    });
  });
});

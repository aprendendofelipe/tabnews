import '@testing-library/jest-dom/vitest';

// Mock only in jsdom environment.
if (typeof document !== 'undefined') {
  global.CSS = {
    supports: vi.fn().mockImplementation(() => {
      return false;
    }),
  };

  Object.defineProperty(window, 'matchMedia', {
    value: vi.fn().mockReturnValue({
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }),
  });
}

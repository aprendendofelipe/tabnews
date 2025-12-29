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

  // https://github.com/jsdom/jsdom/issues/3998
  if (!document.adoptedStyleSheets) {
    Object.defineProperty(document, 'adoptedStyleSheets', {
      writable: true,
      configurable: true,
      value: [],
    });
  }
}

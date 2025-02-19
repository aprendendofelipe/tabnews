import { render, waitFor } from '@testing-library/react';

import { AutoThemeProvider, NoFlashGlobalStyle } from './index.js';

describe('ui', () => {
  describe('AutoThemeProvider', () => {
    vi.mock('../ThemeProvider', () => ({
      ThemeProvider: ({ children, colorMode, ...props }) => (
        <div data-testid="ThemeProvider" data-test-colormode={colorMode} {...props}>
          {children}
        </div>
      ),
    }));

    afterEach(() => localStorage.clear());

    it('renders children correctly', () => {
      const { getByTestId } = render(
        <AutoThemeProvider>
          <div data-testid="child">Child Content</div>
        </AutoThemeProvider>,
      );

      expect(getByTestId('child').innerHTML).toBe('Child Content');
    });

    it('sets initial color mode', () => {
      const { getByTestId } = render(<AutoThemeProvider />);
      const colorMode = getByTestId('ThemeProvider').getAttribute('data-test-colormode');

      expect(colorMode).toBe('light');
    });

    it('sets initial color mode to "dark" via "defaultColorMode"', () => {
      const { getByTestId } = render(<AutoThemeProvider defaultColorMode="dark" />);
      const colorMode = getByTestId('ThemeProvider').getAttribute('data-test-colormode');

      expect(colorMode).toBe('dark');
    });

    it('uses cached color mode from localStorage if available', () => {
      localStorage.setItem('colorMode', 'dark');
      const { getByTestId } = render(<AutoThemeProvider defaultColorMode="light" />);
      const colorMode = getByTestId('ThemeProvider').getAttribute('data-test-colormode');

      expect(colorMode).toBe('dark');
    });

    it('removes data-no-flash attribute after setting color mode', async () => {
      document.documentElement.setAttribute('data-no-flash', 'true');
      render(<AutoThemeProvider defaultColorMode="light" />);

      await waitFor(() => expect(document.documentElement.getAttribute('data-no-flash')).toBeNull());
    });

    it('applies NoFlashGlobalStyle correctly', () => {
      const { container } = render(<AutoThemeProvider defaultColorMode="light" />);
      const styleTag = container.querySelector('style');

      expect(styleTag).not.toBeNull();
      expect(styleTag.textContent).toContain("html[data-no-flash='true'] { visibility: hidden; }");
    });

    it('does not apply NoFlashGlobalStyle when noFlash is false', () => {
      const { container } = render(<AutoThemeProvider noFlash={false} />);
      const styleTag = container.querySelector('style');

      expect(styleTag).toBeNull();
    });
  });

  describe('NoFlashGlobalStyle', () => {
    it('renders the correct global style', () => {
      const { container } = render(<NoFlashGlobalStyle />);
      const styleTag = container.querySelector('style');

      expect(styleTag).not.toBeNull();
      expect(styleTag.innerHTML).toBe("html[data-no-flash='true'] { visibility: hidden; }");
    });
  });
});

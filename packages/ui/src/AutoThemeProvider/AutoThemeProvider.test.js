import { render, waitFor } from '@testing-library/react';

import { AutoThemeProvider, NoFlashGlobalStyle } from '.';

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

      expect(colorMode).toBe('day');
    });

    it('sets initial color mode to "night" via "defaultColorMode"', () => {
      const { getByTestId } = render(<AutoThemeProvider defaultColorMode="night" />);
      const colorMode = getByTestId('ThemeProvider').getAttribute('data-test-colormode');

      expect(colorMode).toBe('night');
    });

    it('uses cached color mode from localStorage if available', () => {
      localStorage.setItem('colorMode', 'night');
      const { getByTestId } = render(<AutoThemeProvider defaultColorMode="day" />);
      const colorMode = getByTestId('ThemeProvider').getAttribute('data-test-colormode');

      expect(colorMode).toBe('night');
    });

    it('removes data-no-flash attribute after setting color mode', async () => {
      document.documentElement.setAttribute('data-no-flash', 'true');
      render(<AutoThemeProvider defaultColorMode="day" />);

      await waitFor(() => expect(document.documentElement.getAttribute('data-no-flash')).toBeNull());
    });

    it('applies NoFlashGlobalStyle correctly', () => {
      const { container } = render(<AutoThemeProvider defaultColorMode="day" />);
      const styleTag = container.querySelector('style');

      expect(styleTag).not.toBeNull();
      expect(styleTag.textContent).toContain("html[data-no-flash='true'] { visibility: hidden; }");
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

import { useEffect, useLayoutEffect, useState } from 'react';

import { ThemeProvider } from '../ThemeProvider/index.js';

// script to be called before interactive in _document.js
// if (['auto','night'].includes(localStorage.getItem('colorMode')))
// document.documentElement.setAttribute('data-no-flash', true)

const removeNoFlashStyle = () => setTimeout(() => document.documentElement.removeAttribute('data-no-flash'));
const useBrowserLayoutEffect = typeof document === 'undefined' ? useEffect : useLayoutEffect;

export function AutoThemeProvider({ children, defaultColorMode, ...props }) {
  const [colorMode, setColorMode] = useState(defaultColorMode === 'night' ? 'night' : 'day');

  useBrowserLayoutEffect(() => {
    const cachedColorMode = localStorage.getItem('colorMode') || colorMode;
    if (cachedColorMode == colorMode) return;
    setColorMode(cachedColorMode);
    removeNoFlashStyle();
  }, []);

  return (
    <ThemeProvider colorMode={colorMode} {...props}>
      <NoFlashGlobalStyle />
      {children}
    </ThemeProvider>
  );
}

export function NoFlashGlobalStyle() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: "html[data-no-flash='true'] { visibility: hidden; }",
      }}
    />
  );
}

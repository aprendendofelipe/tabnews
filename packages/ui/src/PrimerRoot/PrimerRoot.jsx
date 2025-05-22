'use server';
/* eslint-disable @next/next/no-head-element */
import { cookies } from 'next/headers';

import { AutoThemeProvider } from '../AutoThemeProvider/AutoThemeProvider.jsx';
import { COLOR_MODE_COOKIE } from '../constants/public.js';
import { StyledComponentsRegistry } from '../SCRegistry/SCRegistry.jsx';

export async function PrimerRoot({ children, colorMode, defaultColorMode, headChildren, htmlProps, lang, ...props }) {
  const cookieStore = await cookies();
  const cachedColorMode = await cookieStore.get(COLOR_MODE_COOKIE);
  const ssrColorMode = (colorMode || cachedColorMode?.value || defaultColorMode) === 'dark' ? 'dark' : 'light';

  return (
    <html lang={lang} suppressHydrationWarning data-color-mode={ssrColorMode} {...htmlProps}>
      <head>{headChildren}</head>
      <body data-light-theme="light" data-dark-theme="dark">
        <StyledComponentsRegistry>
          <AutoThemeProvider defaultColorMode={ssrColorMode} noFlash={false} preventSSRMismatch {...props}>
            {children}
          </AutoThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

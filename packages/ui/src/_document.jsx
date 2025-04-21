import NextDocument, { Head, Html, Main, NextScript } from 'next/document.js';
import Script from 'next/script.js';
import { ServerStyleSheet } from 'styled-components';

// Script related to `AutoThemeProvider`
export const noFlashScript = `if (['auto','night','dark','day','light'].includes(localStorage.getItem('colorMode')))
document.documentElement.setAttribute('data-no-flash', true)`;

const Doc = NextDocument?.default ?? NextDocument;

export class Document extends Doc {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Doc.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <Script id="theme" strategy="beforeInteractive">
            {noFlashScript}
          </Script>
          <NextScript />
        </body>
      </Html>
    );
  }
}

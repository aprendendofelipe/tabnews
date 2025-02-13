# @tabnews/ui

A React component library for [tabnews.com.br](https://www.tabnews.com.br/).

## Installation

To install the package, use:

```bash
npm i @tabnews/ui
```

## Configure Next.js

In your `next.config.js`, add `@primer/react` and `@tabnews/ui` to `transpilePackages`:

```js
// next.config.js
transpilePackages: ['@primer/react', '@tabnews/ui'],
```

In `pages/_document.js`, you must export it as default:

```js
// pages/_document.js
export { Document as default } from '@tabnews/ui/document';
```

## Theme Setup

### Fixed Theme

To use a fixed color mode (e.g., night mode), wrap your app with `ThemeProvider` in `_app.js`:

```js
// pages/_app.js
import { ThemeProvider } from '@tabnews/ui';
import '@tabnews/ui/css';

export default function NextApp({ Component, pageProps }) {
  return (
    <ThemeProvider colorMode="night">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

### Automatic Theme

For automatic theme switching based on user preference, use `AutoThemeProvider`:

```js
// pages/_app.js
import { AutoThemeProvider } from '@tabnews/ui';
import '@tabnews/ui/css';

export default function NextApp({ Component, pageProps }) {
  return (
    <AutoThemeProvider defaultColorMode="night">
      <Component {...pageProps} />
    </AutoThemeProvider>
  );
}
```

## Configure Vitest

In `vitest.config.js`, set `test.server.deps.inline` to `true`:

```js
// vitest.config.js
test.server.deps.inline: true
```

## Examples

See examples in the `examples` directory.

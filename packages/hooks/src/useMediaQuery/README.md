# useMediaQuery

A performant, SSR-safe React hook for tracking media queries using `useSyncExternalStore`. Optimized for Next.js and React 18+ with support for legacy browsers.

## Basic Usage

Perfect for simple responsive logic in client components.

```jsx
import { useMediaQuery } from '@barso/hooks';

function SimpleComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return <div>{isMobile ? 'Viewing on Mobile' : 'Viewing on Desktop'}</div>;
}
```

## Features

- ⚡ **React 18 Ready**: Uses `useSyncExternalStore` to prevent "tearing" and ensure consistency.
- 🌐 **SSR/Next.js Compatible**: Handles hydration gracefully with customizable fallbacks.
- ⏱️ **Built-in Debounce**: Optional delay to prevent excessive re-renders during window resizing.
- 🔄 **Legacy Support**: Automatic fallback for browsers not supporting `addEventListener` on `matchMedia`.
- 🎣 **Event Callback**: Integrated `onChange` listener for side effects.

## Advanced Example: Theming with `prefers-color-scheme`

To prevent **Flash of Unstyled Content (FOUC)** or layout shifts in Next.js, you can sync the server-side state (derived from cookies or user-agent) with the hook using the `fallback` option.

```jsx
// app/page.js (Server Component)
import { cookies } from 'next/headers';
import ThemeWrapper from './ThemeWrapper';

export default function Page() {
  // Read the saved theme from cookies to ensure the server renders the correct UI
  const themeCookie = cookies().get('theme')?.value;
  const isDarkMode = themeCookie === 'dark';

  return <ThemeWrapper initialIsDark={isDarkMode} />;
}

// ThemeWrapper.js (Client Component)
'use client';
import { useMediaQuery } from '@barso/hooks';

export default function ThemeWrapper({ initialIsDark }) {
  const isDark = useMediaQuery('(prefers-color-scheme: dark)', {
    // Use the server-provided state during hydration
    fallback: initialIsDark,
    // Optional: add debounce for smoother transitions
    debounceMs: 200,
    onChange: (matches) => {
      console.log('Theme changed to:', matches ? 'dark' : 'light');
    }
  });

  return (
    <div className={isDark ? 'dark-mode' : 'light-mode'}>
      <h1>Themed Content</h1>
    </div>
  );
}
```

## API Reference

### `useMediaQuery(query, options)`

| Argument  | Type     | Description                                             |
| --------- | -------- | ------------------------------------------------------- |
| `query`   | `string` | The media query to track (e.g., `(min-width: 1024px)`). |
| `options` | `object` | Configuration object.                                   |

### Options

| Property     | Type                             | Default     | Description                                        |
| ------------ | -------------------------------- | ----------- | -------------------------------------------------- |
| `debounceMs` | `number`                         | `undefined` | Delay in ms to wait before updating the state.     |
| `fallback`   | `boolean` &#124; `() => boolean` | `false`     | Initial value used on server and during hydration. |
| `onChange`   | `(matches: boolean) => void`     | `undefined` | Callback function triggered on every change.       |

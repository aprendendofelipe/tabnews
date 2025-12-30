'use client';
import { useMediaQuery } from '@barso/hooks';

export function DefaultTags() {
  const isDark = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <>
      <link rel="icon" href={isDark ? '/favicon-dark.png' : '/favicon-light.png'} key="favicon" />
      {/* Add other SEO tags or links here as needed */}
    </>
  );
}

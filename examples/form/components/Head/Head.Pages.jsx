import NextHead from 'next/head';

import { DefaultTags } from './Tags';

export function DefaultHead() {
  // next/head does not mount child components like a normal React tree.
  // Using <DefaultTags /> results in the SSR output being reused on the client,
  // so hooks inside the component never run.
  // Calling DefaultTags() forces evaluation instead of relying on component mounting.
  return <NextHead>{DefaultTags()}</NextHead>;
}

export function Head({ title, description }) {
  return (
    <NextHead>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} key="description" />}
    </NextHead>
  );
}

import { AutoThemeProvider } from '@barso/ui';
import '@barso/ui/css';

import { DefaultLayout } from '../components/DefaultLayout';

export default function MyApp({ Component, pageProps }) {
  return (
    <AutoThemeProvider defaultColorMode="dark">
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </AutoThemeProvider>
  );
}

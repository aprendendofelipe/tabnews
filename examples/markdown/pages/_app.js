import { AutoThemeProvider } from '@tabnews/ui';
import '@tabnews/ui/css';

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

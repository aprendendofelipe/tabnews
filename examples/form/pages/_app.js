import { AutoThemeProvider } from '@tabnews/ui';
import '@tabnews/ui/css';

export default function MyApp({ Component, pageProps }) {
  return (
    <AutoThemeProvider defaultColorMode="dark">
      <Component {...pageProps} />
    </AutoThemeProvider>
  );
}

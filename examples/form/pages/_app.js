import { ThemeProvider } from '@tabnews/ui';
import '@tabnews/ui/css';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider colorMode="night">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

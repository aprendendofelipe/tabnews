import { ThemeProvider } from '@tabnews/ui';

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider colorMode="night">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

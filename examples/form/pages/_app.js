import { AutoThemeProvider } from '@barso/ui';
import '@barso/ui/css';

import { DefaultHead } from '../components/Head/Head.Pages';
import { NotificationsProvider } from '../components/Notifications';

export default function MyApp({ Component, pageProps }) {
  return (
    <AutoThemeProvider defaultColorMode="dark">
      <DefaultHead />
      <NotificationsProvider>
        <Component {...pageProps} />
      </NotificationsProvider>
    </AutoThemeProvider>
  );
}

import { AutoThemeProvider } from '@barso/ui';
import '@barso/ui/css';

import { NotificationsProvider } from '../components/Notifications';

export default function MyApp({ Component, pageProps }) {
  return (
    <AutoThemeProvider defaultColorMode="dark">
      <NotificationsProvider>
        <Component {...pageProps} />
      </NotificationsProvider>
    </AutoThemeProvider>
  );
}

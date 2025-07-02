import { AutoThemeProvider } from '@tabnews/ui';
import '@tabnews/ui/css';

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

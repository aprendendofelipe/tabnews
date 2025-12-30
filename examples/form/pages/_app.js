import { AutoThemeProvider } from '@barso/ui';
import '@barso/ui/css';

import { DefaultHead, Head } from '../components/Head/Head.Pages';
import { NotificationsProvider } from '../components/Notifications';

export default function MyApp({ Component, pageProps }) {
  return (
    <AutoThemeProvider defaultColorMode="dark">
      <DefaultHead />
      <Head title="Pages Router · Default Title" description="Pages Router · Default Description" />
      <NotificationsProvider>
        <Component {...pageProps} />
      </NotificationsProvider>
    </AutoThemeProvider>
  );
}

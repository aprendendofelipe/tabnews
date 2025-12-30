import { PrimerRoot } from '@barso/ui';
import '@barso/ui/css';

import { DefaultLayout } from '../components/DefaultLayout.jsx';
import { DefaultHead } from '../components/Head/Head.App';
import { NotificationsProvider } from '../components/Notifications';

export const metadata = {
  title: 'App Router · Default Title',
  description: 'App Router · Default Description',
};

export default function Layout({ children }) {
  return (
    <PrimerRoot defaultColorMode="light" lang="pt-BR">
      <DefaultHead />
      <NotificationsProvider>
        <DefaultLayout containerWidth="medium">{children}</DefaultLayout>
      </NotificationsProvider>
    </PrimerRoot>
  );
}

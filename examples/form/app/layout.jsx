import { PrimerRoot } from '@tabnews/ui';
import '@tabnews/ui/css';

import { DefaultLayout } from '../components/DefaultLayout.jsx';
import { NotificationsProvider } from '../components/Notifications';

export default function Layout({ children }) {
  return (
    <PrimerRoot defaultColorMode="light" lang="pt-BR">
      <NotificationsProvider>
        <DefaultLayout containerWidth="medium">{children}</DefaultLayout>
      </NotificationsProvider>
    </PrimerRoot>
  );
}

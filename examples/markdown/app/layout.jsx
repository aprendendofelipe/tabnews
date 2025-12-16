import { PrimerRoot } from '@barso/ui';
import '@barso/ui/css';

import { DefaultLayout } from '../components/DefaultLayout.jsx';

export default function Layout({ children }) {
  return (
    <PrimerRoot defaultColorMode="light" lang="pt-BR">
      <DefaultLayout>{children}</DefaultLayout>
    </PrimerRoot>
  );
}

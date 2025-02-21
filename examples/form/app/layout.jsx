import { PrimerRoot } from '@tabnews/ui';
import '@tabnews/ui/css';

import { DefaultLayout } from '../components/DefaultLayout.jsx';

export default function Layout({ children }) {
  return (
    <PrimerRoot defaultColorMode="light" lang="pt-BR">
      <DefaultLayout containerWidth="medium">{children}</DefaultLayout>
    </PrimerRoot>
  );
}

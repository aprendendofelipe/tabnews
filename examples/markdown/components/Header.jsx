'use client';
import { Header as PrimerHeader } from '@tabnews/ui/primer';
import NextLink from 'next/link';

import { ThemeSwitcher } from './ThemeSwitcher.jsx';

export function Header() {
  return (
    <PrimerHeader style={{ position: 'sticky', top: 0, zIndex: 1 }}>
      <PrimerHeader.Item>
        <Link href="/">Editor</Link>
      </PrimerHeader.Item>
      <PrimerHeader.Item full>
        <Link href="/viewer">Visualizador</Link>
      </PrimerHeader.Item>
      <PrimerHeader.Item>
        <ThemeSwitcher />
      </PrimerHeader.Item>
    </PrimerHeader>
  );
}

export function Link(props) {
  return <PrimerHeader.Link as={NextLink} {...props} />;
}

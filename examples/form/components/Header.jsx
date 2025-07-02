'use client';
import { Header as PrimerHeader } from '@tabnews/ui/primer';
import NextLink from 'next/link';

import { NotificationCenter } from './Notifications';
import { ThemeSwitcher } from './ThemeSwitcher.jsx';

export function Header() {
  return (
    <PrimerHeader>
      <PrimerHeader.Item>
        <Link href="/">App Router</Link>
      </PrimerHeader.Item>
      <PrimerHeader.Item>
        <Link href="/pages_router">Pages Router</Link>
      </PrimerHeader.Item>
      <PrimerHeader.Item>
        <Link href="/registration">Cadastro</Link>
      </PrimerHeader.Item>
      <PrimerHeader.Item full>
        <Link href="/login">Entrar</Link>
      </PrimerHeader.Item>
      <PrimerHeader.Item>
        <ThemeSwitcher />
      </PrimerHeader.Item>
      <PrimerHeader.Item>
        <NotificationCenter />
      </PrimerHeader.Item>
    </PrimerHeader>
  );
}

export function Link(props) {
  return <PrimerHeader.Link as={NextLink} {...props} />;
}

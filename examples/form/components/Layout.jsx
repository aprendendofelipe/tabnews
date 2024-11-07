import { Box } from '@tabnews/ui';
import { Header } from '@tabnews/ui/primer';

import { ThemeSwitcher } from './index.js';

export function Layout({ children, containerWidth }) {
  return (
    <>
      <Header>
        <Header.Item>
          <Header.Link href="/">Checkout</Header.Link>
        </Header.Item>
        <Header.Item>
          <Header.Link href="/registration">Cadastro</Header.Link>
        </Header.Item>
        <Header.Item full>
          <Header.Link href="/login">Entrar</Header.Link>
        </Header.Item>
        <Header.Item>
          <ThemeSwitcher />
        </Header.Item>
      </Header>
      <Box
        sx={{
          maxWidth: containerWidth,
          marginX: 'auto',
          padding: [2, 3],
        }}>
        {children}
      </Box>
    </>
  );
}

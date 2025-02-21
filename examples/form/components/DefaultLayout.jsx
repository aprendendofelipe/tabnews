import { Box } from '@tabnews/ui';

import { Header } from './Header.jsx';

export function DefaultLayout({ children, containerWidth }) {
  return (
    <>
      <Header />
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

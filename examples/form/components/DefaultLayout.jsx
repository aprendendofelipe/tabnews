import { Box, GoToTopButton } from '@barso/ui';

import { Header } from './Header';

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
      <GoToTopButton target="header" />
    </>
  );
}

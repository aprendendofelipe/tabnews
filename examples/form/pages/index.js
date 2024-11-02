import { Box } from '@tabnews/ui';
import { Header } from '@tabnews/ui/primer';

import { ExampleForm, ThemeSwitcher } from '../components';
import * as formConfig from '../form-config';

export default function Home() {
  return (
    <>
      <Header>
        <Header.Item full />
        <Header.Item>
          <ThemeSwitcher />
        </Header.Item>
      </Header>
      <Box
        sx={{
          maxWidth: '800px',
          marginX: 'auto',
          padding: [2, 3],
        }}>
        <ExampleForm {...formConfig} />
      </Box>
    </>
  );
}

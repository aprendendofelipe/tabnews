import { MoonIcon, SunIcon } from '@primer/octicons-react';
import { Button, useTheme } from '@tabnews/ui';

export function ThemeSwitcher() {
  const { resolvedColorMode: mode, setColorMode } = useTheme();
  const handleSwitchMode = () => setColorMode(mode === 'day' ? 'night' : 'day');

  return (
    <Button
      aria-label='Alternar tema entre "claro" e "escuro"'
      onClick={handleSwitchMode}
      variant="invisible"
      sx={{
        color: mode === 'day' ? '#e7dfc3' : '#ecdc0f99',
        '&:hover': {
          color: mode === 'day' ? '#e7dfc370' : '#ecdc0f',
          backgroundColor: 'transparent',
        },
        '&:focus-visible': {
          outline: '2px solid #FFF',
        },
        px: '7px',
        pb: '3px',
      }}>
      {mode === 'day' ? <MoonIcon size={16} /> : <SunIcon size={16} />}
    </Button>
  );
}

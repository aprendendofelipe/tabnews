import { MoonIcon, SunIcon } from '@primer/octicons-react';
import { Button, useTheme } from '@tabnews/ui';

export function ThemeSwitcher() {
  const { resolvedColorMode: mode, setColorMode } = useTheme();

  const handleSwitchMode = () => {
    const nextColorMode = mode === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-color-mode', nextColorMode);
    setColorMode(nextColorMode);
    localStorage.setItem('colorMode', nextColorMode);
  };

  return (
    <Button
      aria-label='Alternar tema entre "claro" e "escuro"'
      onClick={handleSwitchMode}
      variant="invisible"
      sx={{
        color: mode === 'light' ? '#e7dfc3' : '#ecdc0f99',
        '&:hover': {
          color: mode === 'light' ? '#e7dfc370' : '#ecdc0f',
          backgroundColor: 'transparent',
        },
        '&:focus-visible': {
          outline: '2px solid #FFF',
        },
        px: '7px',
        pb: '3px',
      }}>
      {mode === 'light' ? <MoonIcon size={16} /> : <SunIcon size={16} />}
    </Button>
  );
}

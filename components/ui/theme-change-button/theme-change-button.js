import * as React from 'react';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';

import { darkTheme } from '../../../stitches.config';

import { useThemeStore } from './use-theme-store';

import { Button } from '~/components/ui';

export function ThemeChangeButton() {
  const theme = useThemeStore(state => state.theme);
  const changeTheme = useThemeStore(state => state.changeTheme);

  React.useEffect(() => {
    document.body.classList.remove('theme-default', darkTheme);
    document.body.classList.add(
      theme === 'theme-default' ? theme : theme.className
    );
  }, [theme]);

  return (
    <Button size={2} onClick={changeTheme}>
      {theme === 'theme-default' ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}

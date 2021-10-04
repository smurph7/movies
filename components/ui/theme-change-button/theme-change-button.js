import * as React from 'react';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';

import { darkTheme } from '../../../stitches.config';

import { useThemeStore } from './use-theme-store';

import { Button } from '~/components/ui';

export function ThemeChangeButton() {
  const [icon, setIcon] = React.useState(<SunIcon />);
  const theme = useThemeStore(state => state.theme);
  const changeTheme = useThemeStore(state => state.changeTheme);

  React.useEffect(() => {
    document.body.classList.remove('theme-default', darkTheme);
    document.body.classList.add(
      theme === 'theme-default' ? theme : theme.className
    );
    setIcon(theme === 'theme-default' ? <SunIcon /> : <MoonIcon />);
  }, [theme]);

  return (
    <Button size={2} ghost onClick={changeTheme}>
      {icon}
    </Button>
  );
}

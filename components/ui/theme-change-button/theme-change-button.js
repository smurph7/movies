import * as React from 'react';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';

import { darkTheme } from '../../../stitches.config';

import { useThemeStore } from './use-theme-store';

import { Button } from '~/components/ui';

export function ThemeChangeButton() {
  const [icon, setIcon] = React.useState(
    <SunIcon style={{ width: 24, height: 24 }} />
  );
  const theme = useThemeStore(state => state.theme);
  const changeTheme = useThemeStore(state => state.changeTheme);

  React.useEffect(() => {
    document.body.classList.remove('theme-default', darkTheme);
    document.body.classList.add(
      theme === 'theme-default' ? theme : theme.className
    );
    setIcon(
      theme === 'theme-default' ? (
        <SunIcon style={{ width: 24, height: 24 }} />
      ) : (
        <MoonIcon style={{ width: 24, height: 24 }} />
      )
    );
  }, [theme]);

  return (
    <Button size={2} ghost css={{ color: '$sage11' }} onClick={changeTheme}>
      {icon}
    </Button>
  );
}

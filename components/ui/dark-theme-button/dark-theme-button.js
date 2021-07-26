import * as React from 'react';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';

import { darkTheme } from '../../../stitches.config';

import { Button } from '~/components/ui';

export function DarkThemeButton() {
  const [theme, setTheme] = React.useState('theme-default');

  React.useEffect(() => {
    document.body.classList.remove('theme-default', darkTheme);
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <Button
      style={{ position: 'fixed', zIndex: 999, right: 0, top: 55 }}
      size={2}
      onClick={() =>
        setTheme(theme === 'theme-default' ? darkTheme : 'theme-default')
      }
    >
      {theme === 'theme-default' ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}

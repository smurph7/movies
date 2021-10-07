import * as React from 'react';

import { useThemeChange } from './hooks/use-theme-change';

import { Button } from '~/components/ui';

export function ThemeChangeButton() {
  const { changeTheme, icon } = useThemeChange();
  return (
    <Button
      size={2}
      ghost
      css={{ color: '$sage11' }}
      onClick={changeTheme}
      aria-label="theme"
    >
      {icon}
    </Button>
  );
}

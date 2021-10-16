import * as React from 'react';

import { useThemeChange } from './hooks/use-theme-change';

import { Button, Text } from '~/features/ui';
import { Popover, PopoverTrigger, PopoverContent } from '~/features/ui/popover';

export function ThemeChangeButton() {
  const { themeText, changeTheme, icon } = useThemeChange();
  return (
    <Popover trigger="hover">
      <PopoverTrigger asChild>
        <Button
          size={2}
          ghost
          css={{ color: '$sage11' }}
          onClick={changeTheme}
          aria-label="theme"
        >
          {icon}
        </Button>
      </PopoverTrigger>

      <PopoverContent css={{ bg: '$sage3', padding: '$2' }}>
        <Text color="gray" fontSize={1}>
          {themeText}
        </Text>
      </PopoverContent>
    </Popover>
  );
}

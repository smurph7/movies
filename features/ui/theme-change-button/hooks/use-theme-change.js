import * as React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';

import { darkTheme } from '../../../../stitches.config';
import { useThemeStore } from '../use-theme-store';

import { useUpdateProfile } from '~/features/user/queries';

export function useThemeChange() {
  const { user } = useUser();
  const [icon, setIcon] = React.useState(
    <SunIcon style={{ width: 24, height: 24 }} />
  );
  const theme = useThemeStore(state => state.theme);
  const changeTheme = useThemeStore(state => state.changeTheme);
  const { mutate: updateProfileTheme } = useUpdateProfile();
  const themeText = theme === 'theme-default' ? 'Dark Mode' : 'Light Mode';

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

    if (user) {
      updateProfileTheme({
        themePreference: theme === 'theme-default' ? 'Light' : 'Dark'
      });
    }
  }, [theme, updateProfileTheme, user]);

  return { themeText, changeTheme, icon };
}

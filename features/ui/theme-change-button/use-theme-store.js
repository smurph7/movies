import create from 'zustand';
import { persist } from 'zustand/middleware';

import { darkTheme } from '../../../stitches.config';

export const useThemeStore = create(
  persist(set => ({
    theme: 'theme-default',
    changeTheme: () =>
      set(state => ({
        theme: state.theme === 'theme-default' ? darkTheme : 'theme-default'
      }))
  }))
);

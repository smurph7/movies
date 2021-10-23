import { renderHook } from '@testing-library/react-hooks';
import * as auth from '@auth0/nextjs-auth0';

import * as themeStoreHook from '../use-theme-store';

import { useThemeChange } from './use-theme-change';

import * as updateProfileHook from '~/features/user/queries/use-update-profile';

jest.mock('@auth0/nextjs-auth0', () => ({
  __esModule: true,
  ...jest.requireActual('@auth0/nextjs-auth0')
}));

describe('useThemeChange', () => {
  let useUser;
  let useThemeStore;
  let useUpdateProfile;

  const mutate = jest.fn();

  beforeEach(() => {
    useUser = jest.spyOn(auth, 'useUser').mockReturnValue({ user: undefined });
    useThemeStore = jest.spyOn(themeStoreHook, 'useThemeStore');
    useUpdateProfile = jest
      .spyOn(updateProfileHook, 'useUpdateProfile')
      .mockReturnValue({ mutate });
  });

  afterEach(() => {
    useUser.mockReset();
    useThemeStore.mockReset();
    useUpdateProfile.mockReset();
  });

  it('should return correct values when theme is default', () => {
    useThemeStore.mockReturnValue('theme-default');
    const { result } = renderHook(() => useThemeChange());
    expect(result.current.themeText).toBe('Dark Mode');
  });

  it('should return correct values when theme is dark', () => {
    useThemeStore.mockReturnValue('dark');
    const { result } = renderHook(() => useThemeChange());
    expect(result.current.themeText).toBe('Light Mode');
  });

  it('should not update theme preferences if user does not exist', () => {
    useThemeStore.mockReturnValue('dark');
    const { result } = renderHook(() => useThemeChange());
    expect(result.current.themeText).toBe('Light Mode');
    expect(mutate).not.toHaveBeenCalled();
  });

  it('should update theme preferences if user exists', () => {
    useUser.mockReturnValue({ user: 'name' });
    useThemeStore.mockReturnValue('dark');
    const { result } = renderHook(() => useThemeChange());
    expect(result.current.themeText).toBe('Light Mode');
    expect(mutate).toHaveBeenCalledWith({ themePreference: 'Dark' });
  });
});

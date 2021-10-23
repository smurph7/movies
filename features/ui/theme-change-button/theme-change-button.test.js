import { render, fireEvent } from '../../../test-utils';

import * as themeChangeHook from './hooks/use-theme-change';

import { ThemeChangeButton } from '.';

describe('ThemeChangeButton', () => {
  const icon = 'dark-icon';
  const changeTheme = jest.fn();

  beforeEach(() => {
    jest.spyOn(themeChangeHook, 'useThemeChange').mockReturnValue({
      themeText: 'Dark',
      changeTheme,
      icon
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should display current icon', () => {
    jest.spyOn(themeChangeHook, 'useThemeChange').mockReturnValue({
      themeText: 'Dark',
      changeTheme: jest.fn(),
      icon
    });

    const { getByRole } = render(<ThemeChangeButton />);
    expect(getByRole('button', { name: 'theme' })).toHaveTextContent(icon);
  });

  it('should call change theme on click icon', () => {
    const { getByRole } = render(<ThemeChangeButton />);
    const button = getByRole('button', { name: 'theme' });
    fireEvent.click(button);
    expect(changeTheme).toHaveBeenCalled();
  });
});

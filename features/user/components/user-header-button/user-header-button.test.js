import React from 'react';
import * as auth from '@auth0/nextjs-auth0';
import * as router from 'next/router';

import { render, fireEvent } from '../../../../test-utils';

import { UserHeaderButton } from '.';

jest.mock('@auth0/nextjs-auth0', () => ({
  __esModule: true,
  ...jest.requireActual('@auth0/nextjs-auth0')
}));

describe('UserHeaderButton', () => {
  let useUser;
  let useRouter;
  const push = jest.fn();

  beforeEach(() => {
    useUser = jest.spyOn(auth, 'useUser');
    useRouter = jest.spyOn(router, 'useRouter').mockReturnValue({
      push
    });
  });

  afterEach(() => {
    useUser.mockReset();
    useRouter.mockReset();
  });

  it('should log in if user is logged out', () => {
    useUser.mockReturnValue({
      user: undefined,
      isLoading: false
    });

    const { getByText } = render(<UserHeaderButton />);
    const login = getByText('Login or Register');
    expect(login).toBeInTheDocument();
    fireEvent.click(login);
    expect(push).toHaveBeenCalledWith('/api/auth/login');
  });

  it('should display welcome if loading', () => {
    useUser.mockReturnValue({
      user: undefined,
      isLoading: true
    });
    const { getByText } = render(<UserHeaderButton />);
    const welcome = getByText('Welcome');
    expect(welcome).toBeInTheDocument();
  });

  it('should display user name if user', async () => {
    useUser.mockReturnValue({
      user: { name: 'User' },
      isLoading: false
    });
    const { getByText } = render(<UserHeaderButton />);
    const user = getByText('User');
    expect(user).toBeInTheDocument();
  });
});

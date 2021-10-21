import * as React from 'react';
import * as nextRouter from 'next/router';
import { IoPersonCircleOutline } from 'react-icons/io5';

import { render, fireEvent } from '../../../../test-utils';

import { LoginView } from '.';

describe('LoginView', () => {
  let useRouter;
  const push = jest.fn();

  beforeEach(() => {
    useRouter = jest
      .spyOn(nextRouter, 'useRouter')
      .mockImplementation(() => ({ push }));
  });

  afterEach(() => {
    useRouter.mockReset();
  });

  it('should route to login on click login', () => {
    const { getByRole } = render(<LoginView />);
    const button = getByRole('button', { name: 'login-to-view-page' });
    fireEvent.click(button);
    expect(push).toHaveBeenCalledWith('/api/auth/login');
  });

  it('should display icon', () => {
    const icon = (
      <div data-testid="icon">
        <IoPersonCircleOutline />
      </div>
    );
    const { getByTestId } = render(<LoginView icon={icon} />);
    expect(getByTestId('icon')).toBeInTheDocument();
  });

  it('should display text', () => {
    const text = 'Please login to view this page in particular';
    const { getByText } = render(<LoginView text={text} />);
    expect(getByText(text)).toBeInTheDocument();
  });
});

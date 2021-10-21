import * as React from 'react';
import { IoPersonCircleOutline } from 'react-icons/io5';

import { render } from '../../../../test-utils';

import { ErrorMessageView } from '.';

describe('ErrorMessageView', () => {
  it('should display icon', () => {
    const icon = (
      <div data-testid="icon">
        <IoPersonCircleOutline />
      </div>
    );
    const { getByTestId } = render(<ErrorMessageView icon={icon} />);
    expect(getByTestId('icon')).toBeInTheDocument();
  });

  it('should display message', () => {
    const message = 'Sorry there was an error';
    const { getByText } = render(<ErrorMessageView message={message} />);
    expect(getByText(message)).toBeInTheDocument();
  });
});

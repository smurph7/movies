import React from 'react';

import { render } from '../../../test-utils';

import { ScrollableContainer } from '.';

describe('ScrollableContainer', () => {
  const title = 'Popular';
  const children = <div data-testid="children"> hello</div>;

  it('should display title', () => {
    const { getByText } = render(
      <ScrollableContainer title={title}>{children}</ScrollableContainer>
    );
    expect(getByText(title)).toBeInTheDocument();
  });

  it('should display children', () => {
    const { getByTestId } = render(
      <ScrollableContainer title={title}>{children}</ScrollableContainer>
    );
    expect(getByTestId('children')).toBeInTheDocument();
  });
});

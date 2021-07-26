import React from 'react';

import { render } from '../../../test-utils';

import { HorizontalScroll } from '.';

describe('HorizontalScroll', () => {
  const title = 'Popular';
  const children = <div data-testid="children"> hello</div>;

  it('should display title', () => {
    const { getByText } = render(
      <HorizontalScroll title={title}>{children}</HorizontalScroll>
    );
    expect(getByText(title)).toBeInTheDocument();
  });

  it('should display children', () => {
    const { getByTestId } = render(
      <HorizontalScroll title={title}>{children}</HorizontalScroll>
    );
    expect(getByTestId('children')).toBeInTheDocument();
  });
});

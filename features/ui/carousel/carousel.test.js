import React from 'react';

import { render } from '../../../test-utils';

import { StyledCarousel } from '.';

describe('Carousel', () => {
  window.IntersectionObserver = jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn()
  }));

  const children = [
    <div data-testid="child1" key="child1">
      hello
    </div>,
    <div data-testid="child2" key="child2">
      hello
    </div>
  ];

  it('should display children', () => {
    const { getByTestId } = render(<StyledCarousel>{children}</StyledCarousel>);
    expect(getByTestId('child1')).toBeInTheDocument();
    expect(getByTestId('child2')).toBeInTheDocument();
  });
});

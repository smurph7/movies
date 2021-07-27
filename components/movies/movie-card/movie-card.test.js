import React from 'react';

import { render } from '../../../test-utils';

import { MovieCard } from '.';

function mockNextImage({ src, alt }) {
  return <img src={src} alt={alt} />;
}

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line
  default: ({ src, alt }) => mockNextImage({ src, alt })
}));

jest.mock(
  'next/link',
  () =>
    ({ children }) =>
      children
);

describe('MovieCard', () => {
  const movie = {
    id: 123,
    title: 'Harry Potter',
    posterPath: '/image.jpg'
  };

  it('should display movie image', () => {
    const { getByAltText } = render(<MovieCard movie={movie} />);
    expect(getByAltText(movie.title)).toBeInTheDocument();
  });

  it('should display placeholder if loading', () => {
    const { getByTestId } = render(<MovieCard isLoading />);
    expect(getByTestId('placeholder')).toBeInTheDocument();
  });

  it('should link to movie detail page', async () => {
    const { getByRole } = render(<MovieCard movie={movie} />);
    const link = getByRole('link');
    expect(link).toHaveAttribute('href', '/movie/harry-potter-123');
  });
});

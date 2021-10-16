import React from 'react';

import { render } from '../../../../test-utils';

import { MovieCard } from '.';

import { IMAGE_BASE_URL } from '~/utils/config';

function mockNextImage({ src, alt }) {
  return <img src={src} alt={alt} />;
}

function mockNextLink({ href, children }) {
  return (
    <div data-testid="movie-link" href={href}>
      {children}
    </div>
  );
}

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line
  default: ({ src, alt }) => mockNextImage({ src, alt })
}));

jest.mock('~/features/favourites/components/favourite-button', () => ({
  // eslint-disable-next-line react/display-name
  FavouriteButton: () => <></>
}));

jest.mock('next/link', () => ({
  __esModule: true,
  // eslint-disable-next-line
  default: ({ href, children }) => mockNextLink({ href, children })
}));

describe('MovieCard', () => {
  const movie = {
    id: 123,
    title: 'Harry Potter',
    posterPath: '/image.jpg'
  };

  it('should display movie image', () => {
    const { getByAltText } = render(<MovieCard movie={movie} />);
    expect(getByAltText(movie.title)).toHaveAttribute(
      'src',
      `${IMAGE_BASE_URL}w342/image.jpg`
    );
  });

  it('should display placeholder if loading', () => {
    const { getByTestId } = render(<MovieCard isLoading />);
    expect(getByTestId('placeholder')).toBeInTheDocument();
  });

  it('should link to movie detail page', async () => {
    const { getByTestId } = render(<MovieCard movie={movie} />);
    const link = getByTestId('movie-link');
    expect(link).toHaveAttribute('href', '/movie/harry-potter-123');
  });

  it('should display placeholder image if movie image does not exist', async () => {
    const movieWithNoImage = {
      id: 123,
      title: 'Harry Potter'
    };
    const { getByAltText } = render(<MovieCard movie={movieWithNoImage} />);
    expect(getByAltText(movie.title)).toHaveAttribute(
      'src',
      '/movie-poster-placeholder.svg'
    );
  });
});

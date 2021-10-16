import React from 'react';

import { render } from '../../../test-utils';

import { MovieTiles } from '.';

function mockMovieCard() {
  return <div data-testid="MovieCard" />;
}

jest.mock('~/components/movies/movie-card/movie-card', () => ({
  MovieCard: mockMovieCard
}));

describe('MovieTiles', () => {
  const title = 'Popular';
  const movies = [
    { id: 1, title: 'Harry Potter', posterPath: '/image.jpg' },
    { id: 2, title: 'Harry Potter 2', posterPath: '/image-2.jpg' },
    { id: 3, title: 'Harry Potter 3', posterPath: '/image-3.jpg' },
    { id: 4, title: 'Harry Potter 4', posterPath: '/image-4.jpg' },
    { id: 5, title: 'Harry Potter 5', posterPath: '/image-5.jpg' },
    { id: 6, title: 'Harry Potter 6', posterPath: '/image-6.jpg' }
  ];

  it('should display title', () => {
    const { getByText } = render(<MovieTiles title={title} movies={movies} />);
    expect(getByText(title)).toBeInTheDocument();
  });
});

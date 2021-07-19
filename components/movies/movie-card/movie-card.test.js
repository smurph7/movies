import { render } from '@testing-library/react';

import { MovieCard } from '.';

describe('MovieCard', () => {
  const movie = {
    title: 'Harry Potter',
    description: 'A movie about a wizard'
  };

  it('should display movie title', () => {
    const { getByText } = render(<MovieCard movie={movie} />);
    expect(getByText(movie.title)).toBeInTheDocument();
  });

  it('should display movie description', () => {
    const { getByText } = render(<MovieCard movie={movie} />);
    expect(getByText(movie.description)).toBeInTheDocument();
  });
});

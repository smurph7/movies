import React from 'react';

import { render } from '../../../../test-utils';

import { MovieBannerBackdrop, MovieBannerImage, MovieBannerDetails } from '.';

jest.mock('~/styles/media', () => ({
  // eslint-disable-next-line react/display-name
  Media: ({ children }) => <>{children}</>
}));

jest.mock('~/features/favourites/components/favourite-button', () => ({
  // eslint-disable-next-line react/display-name
  FavouriteButton: () => <></>
}));

jest.mock('~/features/movies/queries/use-watch-providers', () => ({
  // eslint-disable-next-line react/display-name
  useMovieWatchProviders: ({ id }) => id
}));

jest.mock('~/features/movies/components/watch-provider-button', () => ({
  // eslint-disable-next-line react/display-name
  WatchProviderButton: () => <></>
}));

// TODO mock release dates & trailer

describe('Movie Banner', () => {
  describe('MovieBannerBackdrop', () => {
    it('should display backdrop path image', () => {
      const title = 'Title';
      const backdropPath = '/title.jpg';
      const { getByAltText } = render(
        <MovieBannerBackdrop
          title={title}
          backdropPath={backdropPath}
          bgBlurDataUrl={backdropPath}
        />
      );
      expect(getByAltText(`${title}-backdrop`)).toBeInTheDocument();
    });
  });

  describe('MovieBannerImage', () => {
    it('should display poster path image', () => {
      const title = 'Title';
      const posterPath = '/title.jpg';
      const { getByAltText } = render(
        <MovieBannerImage id={123} title={title} src={posterPath} />
      );
      expect(getByAltText(`${title}-poster`)).toBeInTheDocument();
    });
  });

  describe('MovieBannerDetails', () => {
    it('should display movie details', () => {
      const title = 'The Title!';
      const releaseYear = '2020';
      const overview = 'The overview!';
      const genre = { name: 'Comedy' };
      const genres = [genre];
      const tagline = 'The tagline!';

      const movie = {
        title,
        releaseYear,
        overview,
        genres,
        tagline
      };
      const { getByText } = render(<MovieBannerDetails movie={movie} />);

      expect(getByText(`${title} (${releaseYear})`)).toBeInTheDocument();
      expect(getByText(overview)).toBeInTheDocument();
      expect(getByText(genre.name)).toBeInTheDocument();
      expect(getByText(tagline)).toBeInTheDocument();
    });
  });
});

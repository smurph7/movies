import React from 'react';
import * as nextRouter from 'next/router';

import { render, fireEvent } from '../../../../test-utils';

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
  useWatchProviders: ({ id }) => id
}));

jest.mock('~/features/movies/components/watch-provider-button', () => ({
  // eslint-disable-next-line react/display-name
  WatchProviderButton: () => <></>
}));

jest.mock('~/features/movies/components/release-dates', () => ({
  // eslint-disable-next-line react/display-name
  ReleaseDates: () => <></>
}));

jest.mock('~/features/movies/components/trailer', () => ({
  // eslint-disable-next-line react/display-name
  Trailer: () => <></>
}));

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
    const title = 'The Title!';
    const releaseYear = '2020';
    const overview = 'The overview!';
    const genre = { name: 'Comedy', id: '123' };
    const genres = [genre];
    const tagline = 'The tagline!';
    const status = 'Released';
    const runtime = '1h15m';
    const revenue = '123000000';
    const budget = '100000000';
    const voteAverage = '9.1';

    const movie = {
      title,
      releaseYear,
      overview,
      genres,
      tagline,
      status,
      runtime,
      revenue,
      budget,
      voteAverage
    };
    it('should display movie details', () => {
      const { getByText } = render(<MovieBannerDetails movie={movie} />);

      expect(getByText(`${title} (${releaseYear})`)).toBeInTheDocument();
      expect(getByText(overview)).toBeInTheDocument();
      expect(getByText(genre.name)).toBeInTheDocument();
      expect(getByText(tagline)).toBeInTheDocument();
      expect(getByText(status)).toBeInTheDocument();
      expect(getByText(runtime)).toBeInTheDocument();
      expect(getByText('$123,000,000 (USD)')).toBeInTheDocument();
      expect(getByText('$100,000,000 (USD)')).toBeInTheDocument();
      expect(getByText('91%')).toBeInTheDocument();
    });

    it('should link to genre page on click genre button', () => {
      const href = '/genre/comedy-123/1';
      const push = jest.fn();

      const useRouter = jest
        .spyOn(nextRouter, 'useRouter')
        .mockImplementation(() => ({ push }));

      const { getByText } = render(<MovieBannerDetails movie={movie} />);
      const genreButton = getByText(genre.name);
      fireEvent.click(genreButton);
      expect(push).toHaveBeenCalledWith(href);

      useRouter.mockReset();
    });
  });
});

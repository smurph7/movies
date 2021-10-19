import React from 'react';

import { render } from '../../../../test-utils';
import * as movieWatchProvidersHook from '../../queries/use-watch-providers';

import { WatchProviderButton } from '.';

function mockNextImage({ src, alt }) {
  return <img src={src} alt={alt} />;
}

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line
  default: ({ src, alt }) => mockNextImage({ src, alt })
}));

describe('WatchProviderButton', () => {
  let useMovieWatchProviders;
  beforeEach(() => {
    useMovieWatchProviders = jest.spyOn(
      movieWatchProvidersHook,
      'useMovieWatchProviders'
    );
  });

  afterEach(() => {
    useMovieWatchProviders.mockReset();
  });

  //   it('should open dialog to warn changing page on click', () => {});

  it('should return null if no providers', () => {
    useMovieWatchProviders.mockReturnValue({
      data: undefined
    });
    const { queryByRole } = render(<WatchProviderButton id={123} />);
    expect(
      queryByRole('button', { name: 'watch-providers' })
    ).not.toBeInTheDocument();
  });

  it('should display provider with highest display priority', () => {
    const provider1 = {
      providerId: 1,
      providerName: 'Disney',
      logoPath: '/',
      displayPriority: 2
    };
    const provider2 = {
      providerId: 2,
      providerName: 'Netflix',
      logoPath: '/',
      displayPriority: 1
    };
    useMovieWatchProviders.mockReturnValue({
      data: { link: '/', buy: [], rent: [], flatrate: [provider1, provider2] }
    });

    const { getByText, getByRole } = render(<WatchProviderButton id={123} />);
    expect(
      getByRole('button', { name: 'watch-providers' })
    ).toBeInTheDocument();
    expect(getByText('Netflix')).toBeInTheDocument();
  });
});

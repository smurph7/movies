import React from 'react';

import { render, fireEvent } from '../../../../test-utils';

import { WatchProviderButton } from '.';

describe('WatchProviderButton', () => {
  const link = 'www.tmdb.org';
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
  const watchProviders = {
    link,
    buy: [],
    rent: [],
    flatrate: [provider1, provider2]
  };

  it('should return null if no providers', () => {
    const { queryByRole } = render(<WatchProviderButton />);
    expect(
      queryByRole('button', { name: 'watch-providers' })
    ).not.toBeInTheDocument();
  });

  it('should display provider with highest display priority', () => {
    const { getByText, getByRole } = render(
      <WatchProviderButton watchProviders={watchProviders} />
    );
    expect(
      getByRole('button', { name: 'watch-providers' })
    ).toBeInTheDocument();
    expect(getByText('Netflix')).toBeInTheDocument();
  });

  it('should open dialog on click to warn of opening external TMDB link', () => {
    const { getByRole, getByText } = render(
      <WatchProviderButton watchProviders={watchProviders} />
    );
    const button = getByRole('button', { name: 'watch-providers' });
    fireEvent.click(button);
    expect(
      getByText(
        'You will be redirected to TMDB to view providers where this movie is available to watch.'
      )
    ).toBeInTheDocument();
  });

  it('should link to TMDB on click continue', () => {
    window.open = jest.fn();
    const { getByRole, getByText } = render(
      <WatchProviderButton watchProviders={watchProviders} />
    );
    const button = getByRole('button', { name: 'watch-providers' });
    fireEvent.click(button);
    const continueButton = getByText('Continue');
    fireEvent.click(continueButton);
    expect(window.open).toHaveBeenCalledWith(link, '_blank', 'noreferrer');
  });
});

import React from 'react';

import { render } from '../../../../test-utils';

import { WatchProviderButton } from '.';

describe('WatchProviderButton', () => {
  //   it('should open dialog to warn changing page on click', () => {});

  it('should return null if no providers', () => {
    const { queryByRole } = render(<WatchProviderButton />);
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
    const watchProviders = {
      link: '/',
      buy: [],
      rent: [],
      flatrate: [provider1, provider2]
    };

    const { getByText, getByRole } = render(
      <WatchProviderButton watchProviders={watchProviders} />
    );
    expect(
      getByRole('button', { name: 'watch-providers' })
    ).toBeInTheDocument();
    expect(getByText('Netflix')).toBeInTheDocument();
  });
});

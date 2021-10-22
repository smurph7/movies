import React from 'react';

import { render, fireEvent } from '../../../../test-utils';
import * as trailersHook from '../../queries/use-trailers';

import { Trailer } from '.';

describe('Trailer', () => {
  let useTrailers;
  const trailers = [
    { key: 'a', publishedAt: '2021-10-01 19:07:36 UTC' },
    { key: 'b', publishedAt: '2021-08-02 22:04:37 UTC' }
  ];

  beforeEach(() => {
    useTrailers = jest.spyOn(trailersHook, 'useTrailers').mockReturnValueOnce({
      data: trailers
    });
  });

  afterEach(() => {
    useTrailers.mockReset();
  });

  it('should display Play Trailer button', () => {
    const { getByRole } = render(<Trailer id={123} />);
    expect(getByRole('button', { name: 'play-trailer' })).toBeInTheDocument();
  });

  it('should display dialog with youtube iframe on click button', () => {
    const { getByRole, getByTitle } = render(<Trailer id={123} />);

    const button = getByRole('button', { name: 'play-trailer' });
    fireEvent.click(button);
    expect(getByTitle('Youtube Trailer')).toBeInTheDocument();
  });
});

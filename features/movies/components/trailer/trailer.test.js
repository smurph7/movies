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
    useTrailers = jest.spyOn(trailersHook, 'useTrailers');
  });

  afterEach(() => {
    useTrailers.mockReset();
  });

  it('should not display Play Trailer button if trailer does not exist', () => {
    useTrailers.mockReturnValueOnce({ data: [] });
    const { queryByRole } = render(<Trailer id={123} />);

    expect(
      queryByRole('button', { name: 'play-trailer' })
    ).not.toBeInTheDocument();
  });

  it('should display Play Trailer button', () => {
    useTrailers.mockReturnValueOnce({
      data: trailers
    });

    const { getByRole } = render(<Trailer id={123} />);
    expect(getByRole('button', { name: 'play-trailer' })).toBeInTheDocument();
  });

  it('should display dialog with youtube iframe on click button', () => {
    useTrailers.mockReturnValueOnce({
      data: trailers
    });
    const { getByRole, getByTitle } = render(<Trailer id={123} />);

    const button = getByRole('button', { name: 'play-trailer' });
    fireEvent.click(button);
    expect(getByTitle('Youtube Trailer')).toBeInTheDocument();
  });
});

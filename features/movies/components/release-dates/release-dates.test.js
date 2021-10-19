import React from 'react';

import { render } from '../../../../test-utils';
import * as releaseDatesHook from '../../queries/use-release-dates';

import { ReleaseDates } from '.';

jest.mock('~/utils/use-breakpoint/use-breakpoint', () => ({
  useBreakpoint: () => false
}));

describe('ReleaseDates', () => {
  let useReleaseDates;
  const certification = 'PG';
  const releaseDate = '2021-09-09T00:00:00.000Z';
  const region = 'AU';

  beforeEach(() => {
    useReleaseDates = jest
      .spyOn(releaseDatesHook, 'useReleaseDates')
      .mockReturnValueOnce({
        data: { certification, releaseDate, region }
      });
  });

  afterEach(() => {
    useReleaseDates.mockReset();
  });
  it('should display certification', () => {
    const { getByText } = render(<ReleaseDates id={123} />);
    expect(getByText('PG')).toBeInTheDocument();
  });

  it('should display release date and region', () => {
    const { getByText } = render(<ReleaseDates id={123} />);
    expect(getByText('09/09/2021 (AU)')).toBeInTheDocument();
  });
});

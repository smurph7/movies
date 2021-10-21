import * as React from 'react';

import { render, fireEvent } from '../../../../test-utils';

import { MovieReviews } from '.';

import * as movieReviews from '~/features/movies/queries/use-movie-reviews';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn()
}));

describe('MovieReviews', () => {
  let useMovieReviews;
  let useRef;

  const ref = { current: {} };
  Object.defineProperty(ref, 'current', {
    set(_current) {
      this._current = { ..._current, clientHeight: 50, scrollHeight: 100 };
    },
    get() {
      return this._current;
    }
  });

  beforeEach(() => {
    useMovieReviews = jest.spyOn(movieReviews, 'useMovieReviews');
    useRef = jest.spyOn(React, 'useRef').mockReturnValue(ref);
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    useMovieReviews.mockReset();
    useRef.mockReset();
  });

  it('should display reviews', () => {
    const content = 'This is a review.';
    const results = [
      {
        author: 'author',
        id: '1',
        createdAt: '2021-09-26T06:24:52.368Z',
        content,
        authorDetails: { rating: 10 }
      }
    ];
    useMovieReviews.mockReturnValue({ data: { results } });

    const { getByText } = render(<MovieReviews id={123} />);
    expect(getByText('A review by author')).toBeInTheDocument();
    expect(getByText('Written by author on 26/09/2021')).toBeInTheDocument();
    expect(getByText(content)).toBeInTheDocument();
  });

  it('should truncate long reviews', () => {
    const content =
      'This is a long review.\nThis is a long review.\nThis is a long review.\nThis is a long review.';
    const results = [
      {
        author: 'author',
        id: '1',
        createdAt: '2021-09-26T06:24:52.368Z',
        content,
        authorDetails: { rating: 10 }
      }
    ];
    useMovieReviews.mockReturnValue({ data: { results } });
    const { getByText } = render(<MovieReviews id={123} />);
    expect(getByText('View more')).toBeInTheDocument();
  });

  it('should expand long reviews on click view more', () => {
    const content =
      'This is a long review.\nThis is a long review.\nThis is a long review.\nThis is a long review.';
    const results = [
      {
        author: 'author',
        id: '1',
        createdAt: '2021-09-26T06:24:52.368Z',
        content,
        authorDetails: { rating: 10 }
      }
    ];
    useMovieReviews.mockReturnValue({ data: { results } });
    const { getByText } = render(<MovieReviews id={123} />);
    const button = getByText('View more');
    fireEvent.click(button);
    expect(getByText('View less')).toBeInTheDocument();
  });

  it('should truncate long reviews on click view less', () => {
    const content =
      'This is a long review.\nThis is a long review.\nThis is a long review.\nThis is a long review.';
    const results = [
      {
        author: 'author',
        id: '1',
        createdAt: '2021-09-26T06:24:52.368Z',
        content,
        authorDetails: { rating: 10 }
      }
    ];
    useMovieReviews.mockReturnValue({ data: { results } });
    const { getByText, queryByText } = render(<MovieReviews id={123} />);

    const viewMoreButton = getByText('View more');
    fireEvent.click(viewMoreButton);
    const viewLessButton = getByText('View less');
    fireEvent.click(viewLessButton);
    expect(getByText('View more')).toBeInTheDocument();
    expect(queryByText('View less')).not.toBeInTheDocument();
  });
});

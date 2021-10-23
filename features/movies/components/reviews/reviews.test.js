import * as React from 'react';

import { render, fireEvent } from '../../../../test-utils';

import { Reviews } from '.';

import * as reviews from '~/features/movies/queries/use-movie';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn()
}));

describe('Reviews', () => {
  let useReviews;
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
    useReviews = jest.spyOn(reviews, 'useReviews');
    useRef = jest.spyOn(React, 'useRef').mockReturnValue(ref);
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    useReviews.mockReset();
    useRef.mockReset();
  });

  it('should display one review initially', () => {
    const content = 'This is a review.';
    const results = [
      {
        author: 'author',
        id: '1',
        createdAt: '2021-09-26T06:24:52.368Z',
        content,
        authorDetails: { rating: 10 }
      },
      {
        author: 'authorTwo',
        id: '2',
        createdAt: '2021-09-26T06:24:52.368Z',
        content,
        authorDetails: { rating: 10 }
      }
    ];
    useReviews.mockReturnValue({ data: { results } });

    const { getByText, queryByText } = render(<Reviews id={123} />);
    expect(getByText('A review by author')).toBeInTheDocument();
    expect(getByText('Written by author on 26/09/2021')).toBeInTheDocument();
    expect(getByText(content)).toBeInTheDocument();
    expect(queryByText('A review by authorTwo')).not.toBeInTheDocument();
    expect(
      queryByText('Written by authorTwo on 26/09/2021')
    ).not.toBeInTheDocument();
  });

  it('should not display view all reviews button if only one review exists', () => {
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
    useReviews.mockReturnValue({ data: { results } });
    const { queryByText } = render(<Reviews id={123} />);
    expect(queryByText('View all reviews')).not.toBeInTheDocument();
  });

  it('should display all reviews on click View all reviews', () => {
    const content = 'This is a review.';
    const results = [
      {
        author: 'author',
        id: '1',
        createdAt: '2021-09-26T06:24:52.368Z',
        content,
        authorDetails: { rating: 10 }
      },
      {
        author: 'authorTwo',
        id: '2',
        createdAt: '2021-09-26T06:24:52.368Z',
        content,
        authorDetails: { rating: 10 }
      }
    ];
    useReviews.mockReturnValue({ data: { results } });

    const { getByText } = render(<Reviews id={123} />);
    const viewAllReviewsButton = getByText('View all reviews');
    fireEvent.click(viewAllReviewsButton);
    expect(getByText('A review by author')).toBeInTheDocument();
    expect(getByText('A review by authorTwo')).toBeInTheDocument();
  });

  it('should hide all but the first review on click View less', () => {
    const content = 'This is a review.';
    const results = [
      {
        author: 'author',
        id: '1',
        createdAt: '2021-09-26T06:24:52.368Z',
        content,
        authorDetails: { rating: 10 }
      },
      {
        author: 'authorTwo',
        id: '2',
        createdAt: '2021-09-26T06:24:52.368Z',
        content,
        authorDetails: { rating: 10 }
      }
    ];
    useReviews.mockReturnValue({ data: { results } });

    const { getByText, queryByText } = render(<Reviews id={123} />);
    const viewAllReviewsButton = getByText('View all reviews');
    fireEvent.click(viewAllReviewsButton);
    const viewLessReviewsButton = getByText('View less');
    fireEvent.click(viewLessReviewsButton);
    expect(getByText('A review by author')).toBeInTheDocument();
    expect(queryByText('A review by authorTwo')).not.toBeInTheDocument();
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
    useReviews.mockReturnValue({ data: { results } });
    const { getByText } = render(<Reviews id={123} />);
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
    useReviews.mockReturnValue({ data: { results } });
    const { getByText } = render(<Reviews id={123} />);
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
    useReviews.mockReturnValue({ data: { results } });
    const { getByText, queryByText } = render(<Reviews id={123} />);

    const viewMoreButton = getByText('View more');
    fireEvent.click(viewMoreButton);
    const viewLessButton = getByText('View less');
    fireEvent.click(viewLessButton);
    expect(getByText('View more')).toBeInTheDocument();
    expect(queryByText('View less')).not.toBeInTheDocument();
  });
});

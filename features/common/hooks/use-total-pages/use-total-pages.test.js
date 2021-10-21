import { renderHook } from '@testing-library/react-hooks';

import { useTotalPages } from './use-total-pages';

describe('usePagination', () => {
  it('should return correct number of total pages based on total and resultsPerPage', () => {
    const { result } = renderHook(() =>
      useTotalPages({
        total: 100,
        resultsPerPage: 10,
        page: 1,
        handlePageChange: jest.fn()
      })
    );

    expect(result.current).toBe(10);
  });

  it('should return maxPages of 500 if result is more than max pages', () => {
    const { result } = renderHook(() =>
      useTotalPages({
        total: 600,
        resultsPerPage: 1,
        page: 1,
        handlePageChange: jest.fn()
      })
    );

    expect(result.current).toBe(500);
  });

  it('should return 1 if total is undefined', () => {
    const { result } = renderHook(() =>
      useTotalPages({
        resultsPerPage: 1,
        page: 1,
        handlePageChange: jest.fn()
      })
    );

    expect(result.current).toBe(1);
  });

  it('should return 1 if resultsPerPage is undefined', () => {
    const { result } = renderHook(() =>
      useTotalPages({
        total: 100,
        page: 1,
        handlePageChange: jest.fn()
      })
    );

    expect(result.current).toBe(1);
  });
});

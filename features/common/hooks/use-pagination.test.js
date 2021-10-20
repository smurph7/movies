import { renderHook } from '@testing-library/react-hooks';

import { usePagination } from './use-pagination';

describe('usePagination', () => {
  it('should return correct value when page set to first', () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 0,
        setCurrentPage: jest.fn(),
        totalPages: 10,
        edgePageCount: 2,
        middlePagesSiblingCount: 1
      })
    );

    expect(result.current.currentPage).toBe(0);
    expect(result.current.pages).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(result.current.hasPreviousPage).toBe(false);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.previousPages).toStrictEqual([]);
    expect(result.current.isPreviousTruncatable).toBe(false);
    expect(result.current.middlePages).toStrictEqual([1, 2, 3]);
    expect(result.current.isNextTruncatable).toBe(true);
    expect(result.current.nextPages).toStrictEqual([9, 10]);
  });

  it('should return correct value when page set to last', () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 10,
        setCurrentPage: jest.fn(),
        totalPages: 10,
        edgePageCount: 2,
        middlePagesSiblingCount: 1
      })
    );

    expect(result.current.currentPage).toBe(10);
    expect(result.current.pages).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(result.current.hasPreviousPage).toBe(true);
    expect(result.current.hasNextPage).toBe(false);
    expect(result.current.previousPages).toStrictEqual([1, 2]);
    expect(result.current.isPreviousTruncatable).toBe(true);
    expect(result.current.middlePages).toStrictEqual([8, 9, 10]);
    expect(result.current.isNextTruncatable).toBe(false);
    expect(result.current.nextPages).toStrictEqual([]);
  });

  it('should return correct values when page set to middle', () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 5,
        setCurrentPage: jest.fn(),
        totalPages: 10,
        edgePageCount: 2,
        middlePagesSiblingCount: 1
      })
    );

    expect(result.current.currentPage).toBe(5);
    expect(result.current.pages).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(result.current.hasPreviousPage).toBe(true);
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.previousPages).toStrictEqual([1, 2]);
    expect(result.current.isPreviousTruncatable).toBe(true);
    expect(result.current.middlePages).toStrictEqual([5, 6, 7]);
    expect(result.current.isNextTruncatable).toBe(true);
    expect(result.current.nextPages).toStrictEqual([9, 10]);
  });

  it('should return correct middlePages value when middlePagesSiblingCount 0', () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 50,
        setCurrentPage: jest.fn(),
        totalPages: 100,
        edgePageCount: 2,
        middlePagesSiblingCount: 0
      })
    );

    expect(result.current.middlePages).toStrictEqual([51]);
  });

  it('should return correct middlePages when middlePagesSiblingCount 10', () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 50,
        setCurrentPage: jest.fn(),
        totalPages: 100,
        edgePageCount: 2,
        middlePagesSiblingCount: 10
      })
    );

    expect(result.current.middlePages).toStrictEqual([
      41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
      59, 60, 61
    ]);
  });

  it('should return correct nextPages when edgePageCount 5', () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 50,
        setCurrentPage: jest.fn(),
        totalPages: 100,
        edgePageCount: 5,
        middlePagesSiblingCount: 10
      })
    );

    expect(result.current.previousPages).toStrictEqual([1, 2, 3, 4, 5]);
    expect(result.current.nextPages).toStrictEqual([96, 97, 98, 99, 100]);
  });

  it('should return empty pages array when 0 pages', () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 0,
        setCurrentPage: jest.fn(),
        totalPages: 0,
        edgePageCount: 2,
        middlePagesSiblingCount: 1
      })
    );

    expect(result.current.pages).toStrictEqual([]);
    expect(result.current.hasPreviousPage).toBe(false);
    expect(result.current.hasNextPage).toBe(false);
    expect(result.current.previousPages).toStrictEqual([]);
    expect(result.current.isPreviousTruncatable).toBe(false);
    expect(result.current.middlePages).toStrictEqual([]);
    expect(result.current.isNextTruncatable).toBe(false);
    expect(result.current.nextPages).toStrictEqual([]);
  });

  it('should not have next pages when only 2 pages', () => {
    const { result } = renderHook(() =>
      usePagination({
        currentPage: 0,
        setCurrentPage: jest.fn(),
        totalPages: 2,
        edgePageCount: 2,
        middlePagesSiblingCount: 1
      })
    );

    expect(result.current.pages).toStrictEqual([1, 2]);
    expect(result.current.middlePages).toStrictEqual([1, 2]);
    expect(result.current.nextPages).toStrictEqual([]);
  });
});

// Inspired by https://github.com/fullhdpixel/react-headless-pagination
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';

export function usePagination({
  currentPage,
  setCurrentPage,
  handlePrefetchPage,
  truncatableText = '...',
  truncatableClassName = '',
  totalPages,
  edgePageCount = 2,
  middlePagesSiblingCount = 0
}) {
  const pages = Array(totalPages)
    .fill(0)
    .map((_, i) => i + 1);

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const isReachedToFirst = currentPage <= middlePagesSiblingCount;
  const isReachedToLast = currentPage + middlePagesSiblingCount >= totalPages;

  const middlePages = React.useMemo(() => {
    const middlePageCount = middlePagesSiblingCount * 2 + 1;
    if (isReachedToFirst) {
      return pages.slice(0, middlePageCount);
    }
    if (isReachedToLast) {
      return pages.slice(-middlePageCount);
    }
    return pages.slice(
      Number(currentPage) - middlePagesSiblingCount,
      Number(currentPage) + middlePagesSiblingCount + 1
    );
  }, [currentPage, pages]);

  function getAllPreviousPages() {
    return pages.slice(0, middlePages[0] - 1);
  }

  const previousPages = React.useMemo(() => {
    if (isReachedToFirst) {
      return [];
    }
    if (getAllPreviousPages().length < 1) {
      return [];
    }
    return pages.slice(0, edgePageCount).filter(p => !middlePages.includes(p));
  }, [currentPage, pages]);

  const getAllNextPages = React.useMemo(
    () => pages.slice(middlePages[middlePages.length - 1], pages[pages.length]),
    [pages, middlePages]
  );

  const nextPages = React.useMemo(() => {
    if (isReachedToLast) {
      return [];
    }
    if (getAllNextPages.length < 1) {
      return [];
    }
    return pages
      .slice(pages.length - edgePageCount, pages.length)
      .filter(p => !middlePages.includes(p));
  }, [middlePages, pages]);

  const isPreviousTruncatable = React.useMemo(
    () => middlePages[0] > previousPages[previousPages.length - 1] + 1,
    [previousPages, middlePages]
  );

  const isNextTruncatable = React.useMemo(
    () => middlePages[middlePages.length - 1] + 1 < nextPages[0],
    [nextPages, middlePages]
  );

  return {
    currentPage,
    setCurrentPage,
    handlePrefetchPage,
    truncatableText,
    truncatableClassName,
    pages,
    hasPreviousPage,
    hasNextPage,
    previousPages,
    isPreviousTruncatable,
    middlePages,
    isNextTruncatable,
    nextPages
  };
}

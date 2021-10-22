import * as React from 'react';

export function useTotalPages({
  total,
  resultsPerPage,
  page,
  handlePageChange
}) {
  return React.useMemo(() => {
    const maxPages = 500;
    const totalRawPages = Math.ceil(total / resultsPerPage) || page;

    const totalPages = totalRawPages > maxPages ? maxPages : totalRawPages;

    if (page > maxPages || page > totalRawPages) {
      handlePageChange(totalPages);
    }
    return totalPages;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, page]);
}

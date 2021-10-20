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

    if (page > maxPages || page > totalRawPages) {
      handlePageChange(totalRawPages);
    }
    return totalRawPages > maxPages ? maxPages : totalRawPages;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, page]);
}

import * as React from 'react';
import { useRouter } from 'next/router';

import { Flex } from '~/features/ui';
import {
  ErrorMessageView,
  Layout,
  Pagination
} from '~/features/common/components';
import { MovieTiles } from '~/features/movies/components';
import { useGenre } from '~/features/movies/queries';
import { usePageChange } from '~/features/common/hooks/use-page-change';
import { useTotalPages } from '~/features/common/hooks/use-total-pages';
import { getStringFromUrl } from '~/utils/get-string-from-url';

export default function Genre() {
  const router = useRouter();
  const { slug, page } = router.query;
  const resultsPerPage = 20;

  const splitSlug = slug?.split('-');
  const id = splitSlug ? splitSlug[splitSlug?.length - 1] : undefined;
  const genre = splitSlug?.slice(0, -1).join('-');

  const genreQuery = useGenre({ id, page });
  const isLoading = genreQuery.isLoading || genreQuery.isIdle;

  const { handlePageChange } = usePageChange();
  const totalPages = useTotalPages({
    total: genreQuery?.data?.totalResults,
    resultsPerPage,
    page,
    handlePageChange
  });

  return (
    <Layout>
      <Flex direction="column" gap={5}>
        <MovieTiles
          title={
            splitSlug && genreQuery?.data?.totalResults > 0
              ? getStringFromUrl(genre)
              : ''
          }
          movies={genreQuery?.data?.results}
          isLoading={isLoading}
          placeholderLength={resultsPerPage}
        />
        {genreQuery?.data?.totalResults === 0 && <ErrorMessageView />}
        {genreQuery?.data?.totalResults > 0 && (
          <Flex justify="center">
            <Pagination
              currentPage={page}
              setCurrentPage={newPage => handlePageChange(newPage)}
              totalPages={totalPages}
              edgePageCount={2}
              middlePagesSiblingCount={2}
            >
              <Flex align="center" justify="center" gap={2}>
                <Pagination.PrevButton />
                <Pagination.PageButton />
                <Pagination.NextButton />
              </Flex>
            </Pagination>
          </Flex>
        )}
      </Flex>
    </Layout>
  );
}

import * as React from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';

import {
  useFavouriteMovies,
  useFavouritesTotal
} from '~/features/favourites/queries';
import { Layout, Pagination } from '~/features/common/components';
import { MovieTiles } from '~/features/movies/components';
import { Flex, Text } from '~/features/ui';
import { useTotalPages } from '~/features/common/hooks/use-total-pages';

export default function Favourites() {
  const { user, isLoading: userIsLoading } = useUser();
  const router = useRouter();
  const page = router.query?.page;
  const resultsPerPage = 10;

  const favouritesQuery = useFavouriteMovies({ page, resultsPerPage });
  const { data: totalFavourites } = useFavouritesTotal();

  function handlePageChange(newPage) {
    router.push(`/favourites/${newPage}`, null, { shallow: true });
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  const totalPages = useTotalPages({
    total: totalFavourites,
    resultsPerPage,
    page,
    handlePageChange
  });

  return (
    <Layout>
      {user || userIsLoading ? (
        <Flex direction="column" gap={5}>
          <MovieTiles
            title="Favourites"
            movies={favouritesQuery?.data?.results}
            isLoading={favouritesQuery.isLoading || favouritesQuery.isIdle}
          />
          {favouritesQuery?.data?.results?.length > 0 && (
            <Flex justify="center">
              <Pagination
                currentPage={page}
                setCurrentPage={handlePageChange}
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
      ) : (
        // TODO add sign in view
        <Flex justify="center" css={{ p: '$8' }}>
          <Text>Please log in to view your favourites</Text>
        </Flex>
      )}
    </Layout>
  );
}

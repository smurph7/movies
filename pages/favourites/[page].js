import * as React from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';

import {
  useFavouriteMovies,
  useFavouritesTotal
} from '~/features/favourites/queries';
import { Layout, Pagination, LoginView } from '~/features/common/components';
import { MovieTiles } from '~/features/movies/components';
import { Flex, Text } from '~/features/ui';
import { useTotalPages } from '~/features/common/hooks/use-total-pages';
import { usePageChange } from '~/features/common/hooks/use-page-change';

export default function Favourites() {
  const { user, isLoading: userIsLoading } = useUser();
  const router = useRouter();
  const page = router.query?.page;
  const resultsPerPage = 10;
  const { handlePageChange } = usePageChange();

  const favouritesQuery = useFavouriteMovies({ page, resultsPerPage });
  const { data: totalFavourites } = useFavouritesTotal();

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
          {totalFavourites === 0 && (
            <Flex direction="column" align="center" gap={2}>
              <Text color="gray">You don't have any favourites yet.</Text>
              <Text color="gray">
                Add some movies to your favourites to see them here.
              </Text>
            </Flex>
          )}
          {totalFavourites > 0 && (
            <Flex justify="center">
              <Pagination
                currentPage={page}
                setCurrentPage={newPage =>
                  handlePageChange(`/favourites/${newPage}`)
                }
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
        <Flex justify="center" css={{ p: '$8' }}>
          <LoginView text="Please log in to view your favourites" />
        </Flex>
      )}
    </Layout>
  );
}

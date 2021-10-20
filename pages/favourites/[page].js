import * as React from 'react';
import { useRouter } from 'next/router';

import { useFavouriteMovies } from '~/features/favourites/queries';
import { Layout } from '~/features/common/components';
import { MovieTiles } from '~/features/movies/components';
import { Flex } from '~/features/ui';
import { Pagination } from '~/features/common/components/pagination';

export default function Favourites() {
  const router = useRouter();
  const page = router.query?.page;
  const favouritesQuery = useFavouriteMovies({ page });

  return (
    <Layout>
      <Flex direction="column" gap={5}>
        <MovieTiles
          title="Favourites"
          movies={favouritesQuery?.data?.results}
          isLoading={favouritesQuery.isLoading}
        />
        <Flex justify="center">
          <Pagination
            currentPage={page}
            setCurrentPage={newPage =>
              router.push(`/favourites/${newPage + 1}`, null, { shallow: true })
            }
            totalPages={3}
          >
            <Flex align="center" justify="center" gap={2}>
              <Pagination.PrevButton />
              <Pagination.PageButton />
              <Pagination.NextButton />
            </Flex>
          </Pagination>
        </Flex>
      </Flex>
    </Layout>
  );
}

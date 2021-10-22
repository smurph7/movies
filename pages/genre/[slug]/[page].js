import * as React from 'react';
import { useRouter } from 'next/router';

import { Flex } from '~/features/ui';
import { Layout } from '~/features/common/components';
import { MovieTiles } from '~/features/movies/components';
import { useGenre } from '~/features/movies/queries';
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

  return (
    <Layout>
      <Flex direction="column" gap={5}>
        <MovieTiles
          title={splitSlug ? getStringFromUrl(genre) : ''}
          movies={genreQuery?.data?.results}
          isLoading={isLoading}
          placeholderLength={resultsPerPage}
        />
      </Flex>
    </Layout>
  );
}

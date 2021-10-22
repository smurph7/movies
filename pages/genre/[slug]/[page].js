import * as React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import { Flex } from '~/features/ui';
import {
  ErrorMessageView,
  Layout,
  Pagination,
  Metadata
} from '~/features/common/components';
import { MovieTiles } from '~/features/movies/components';
import { useGenre } from '~/features/movies/queries';
import { usePageChange } from '~/features/common/hooks/use-page-change';
import { useTotalPages } from '~/features/common/hooks/use-total-pages';
import { getStringFromUrl } from '~/utils/get-string-from-url';

export async function getStaticProps({ params }) {
  const splitSlug = params.slug?.split('-');
  const id = splitSlug ? splitSlug[splitSlug?.length - 1] : undefined;
  let genre;

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/discover/movie?with_genres=${id}&page=${params.page}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
        }
      }
    );

    genre = data;
  } catch (error) {
    genre = {};
  }

  return {
    props: {
      genre
    },
    revalidate: 60 * 60
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export default function Genre({ genre: initialGenre }) {
  const router = useRouter();
  const { slug, page } = router.query;
  const resultsPerPage = 20;

  const splitSlug = slug?.split('-');
  const id = splitSlug ? splitSlug[splitSlug?.length - 1] : undefined;
  const genre = splitSlug?.slice(0, -1).join('-');

  const genreQuery = useGenre({ id, page, genre: initialGenre });
  const isLoading = genreQuery.isLoading || genreQuery.isIdle;

  const { handlePageChange } = usePageChange();
  const totalPages = useTotalPages({
    total: genreQuery?.data?.totalResults,
    resultsPerPage,
    page,
    handlePageChange
  });

  const title =
    splitSlug && genreQuery?.data?.totalResults > 0
      ? getStringFromUrl(genre)
      : '';

  return (
    <>
      <Metadata
        title={`Genre${title && ` - ${title}`}`}
        description={`Movies by genre${title && ` - ${title}`}`}
      />
      <Layout>
        <Flex direction="column" gap={5}>
          <MovieTiles
            title={title}
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
    </>
  );
}

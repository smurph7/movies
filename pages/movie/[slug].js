import * as React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getPlaiceholder } from 'plaiceholder';

import {
  Layout,
  ErrorMessageView,
  Metadata
} from '~/features/common/components';
import { Container, Placeholder, Flex } from '~/features/ui';
import {
  MovieBanner,
  MovieBannerBackdrop,
  MovieBannerDetailSection,
  MovieBannerImage,
  MovieBannerDetails,
  Reviews,
  Cast
} from '~/features/movies/components';
import { useMovie } from '~/features/movies/queries';
import { transformMovieData } from '~/features/movies/utils/transform-movie-data';
import { IMAGE_BASE_URL } from '~/utils/config';

export async function getStaticProps({ params }) {
  const splitSlug = params.slug?.split('-');
  const id = splitSlug ? splitSlug[splitSlug?.length - 1] : undefined;
  let movie;
  let bgBlurDataUrl;
  let posterBlurDataUrl;

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${id}?append_to_response=watch/providers,videos,release_dates,credits`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
        }
      }
    );

    try {
      const { base64: bgBase64 } = await getPlaiceholder(
        `${IMAGE_BASE_URL}original${data.backdrop_path}`
      );
      bgBlurDataUrl = bgBase64;
    } catch (error) {
      bgBlurDataUrl = {};
    }

    try {
      const { base64: posterBase64 } = await getPlaiceholder(
        `${IMAGE_BASE_URL}w500${data.poster_path}`
      );
      posterBlurDataUrl = posterBase64;
    } catch (error) {
      posterBlurDataUrl = {};
    }
    movie = transformMovieData(data);
  } catch (error) {
    movie = {};
    bgBlurDataUrl = {};
    posterBlurDataUrl = {};
  }

  return {
    props: {
      movie,
      imageprops: {
        bgBlurDataUrl,
        posterBlurDataUrl
      }
    },
    revalidate: 60 * 60
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export default function Movie({ movie, imageprops }) {
  const router = useRouter();
  const { slug } = router.query;

  const splitSlug = slug?.split('-');
  const id = splitSlug ? splitSlug[splitSlug?.length - 1] : undefined;

  const movieQuery = useMovie({ id, movie });
  const isLoading = movieQuery.isLoading || movieQuery.isIdle;

  const title = `${movieQuery?.data?.title} ${
    movieQuery?.data?.releaseYear && `(${movieQuery?.data?.releaseYear})`
  }`;

  return (
    <>
      <Metadata
        title={movieQuery?.data?.title ? title : 'Not found'}
        description={movieQuery?.data?.overview ?? 'Not found'}
      />
      <Layout>
        {/* eslint-disable-next-line no-nested-ternary */}
        {movieQuery.isError ? (
          <ErrorMessageView
            icon={null}
            message={`Sorry, we couldn't find the movie you were looking for.`}
          />
        ) : isLoading ? (
          <Placeholder width="100%" height={600} />
        ) : (
          <Flex direction="column" gap={5}>
            {movieQuery.data && (
              <MovieBanner imageprops={imageprops} movie={movieQuery.data}>
                <MovieBannerBackdrop
                  title={movieQuery.data?.title}
                  backdropPath={movieQuery.data?.backdropPath}
                  bgBlurDataUrl={imageprops?.bgBlurDataUrl}
                />
                <MovieBannerDetailSection>
                  <MovieBannerImage
                    id={movieQuery.data?.id}
                    title={movieQuery.data?.title}
                    src={movieQuery.data?.posterPath}
                    posterBlurDataUrl={imageprops?.posterBlurDataUrl}
                    watchProviders={movieQuery.data?.watchProviders}
                  />
                  <MovieBannerDetails movie={movieQuery.data} />
                </MovieBannerDetailSection>
              </MovieBanner>
            )}
            <Container
              size={{ '@bp1': 1, '@bp2': 2, '@bp3': 3, '@bp4': 4, '@bp5': 5 }}
              css={{ height: '100%' }}
            >
              <Flex direction="column" gap={5} css={{ height: '100%' }}>
                <Cast id={movieQuery.data?.id} />
                <Reviews id={movieQuery.data?.id} />
              </Flex>
            </Container>
          </Flex>
        )}
      </Layout>
    </>
  );
}

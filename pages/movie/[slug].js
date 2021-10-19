import * as React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getPlaiceholder } from 'plaiceholder';
import { PlayIcon } from '@radix-ui/react-icons';

import { Layout } from '~/features/common/components';
import {
  Container,
  Box,
  Text,
  Flex,
  Button,
  Placeholder,
  FloatingCard
} from '~/features/ui';
import { Dialog, DialogContent, DialogTrigger } from '~/features/ui/dialog';
import {
  MovieBanner,
  MovieBannerBackdrop,
  MovieBannerDetailSection,
  MovieBannerImage,
  MovieBannerDetails
} from '~/features/movies/components';
import {
  useMovie,
  useReleaseDates,
  useMovieTrailers
} from '~/features/movies/queries';
import { useBreakpoint } from '~/utils/use-breakpoint';
import { IMAGE_BASE_URL } from '~/utils/config';

export async function getStaticProps({ params }) {
  const splitSlug = params.slug?.split('-');
  const id = splitSlug ? splitSlug[splitSlug?.length - 1] : undefined;
  let movie;
  let bgBlurDataUrl;
  let posterBlurDataUrl;

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${id}?append_to_response=watch/providers`,
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

    movie = data;
  } catch (error) {
    movie = {};
  }

  return {
    props: {
      movie,
      imageProps: {
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

export default function Movie({ movie, imageProps }) {
  const router = useRouter();
  const { slug } = router.query;

  const splitSlug = slug?.split('-');
  const id = splitSlug ? splitSlug[splitSlug?.length - 1] : undefined;

  const movieQuery = useMovie({ id, movie });
  const isLoading = movieQuery.isLoading || movieQuery.isIdle;

  return (
    <Layout>
      {isLoading ? (
        <Placeholder width="100%" height={600} />
      ) : (
        <>
          {movieQuery.data && (
            <MovieBanner imageProps={imageProps} movie={movieQuery.data}>
              <MovieBannerBackdrop
                title={movieQuery.data?.title}
                backdropPath={movieQuery.data?.backdropPath}
                bgBlurDataUrl={imageProps?.bgBlurDataUrl}
              />
              <MovieBannerDetailSection>
                <MovieBannerImage
                  id={movieQuery.data?.id}
                  title={movieQuery.data?.title}
                  src={movieQuery.data?.posterPath}
                  posterBlurDataUrl={imageProps?.posterBlurDataUrl}
                  watchProviders={movieQuery.data?.watchProviders}
                />
                <MovieBannerDetails movie={movieQuery.data} />
              </MovieBannerDetailSection>
            </MovieBanner>
          )}
          <Container size={5} css={{ height: '100%' }}>
            <FloatingCard>hello there</FloatingCard>
            {/* watch providers */}
            {/* Regions */}
            {/* Languages */}
            {/* Cast  */}
            {/* Reviews */}
            {/* Status (col) */}
          </Container>
        </>
      )}
    </Layout>
  );
}

function ReleaseDates({ id }) {
  const { data } = useReleaseDates({ id });
  const isMobile = useBreakpoint('bp3');
  const color = isMobile ? 'gray' : 'lightGray';

  if (!data) {
    return <Box css={{ p: '$3' }} />;
  }

  const releaseDate = new Intl.DateTimeFormat('en-AU').format(
    new Date(data.releaseDate)
  );

  return (
    <Flex align="center" gap={1}>
      {data.certification && data.certification !== '' && (
        <Box css={{ border: '1px solid $sage1NoDark', p: '$1' }}>
          <Text color={color} fontSize={2}>
            {data.certification}
          </Text>
        </Box>
      )}
      {data.releaseDate && (
        <Text color={color} fontSize={2}>
          {releaseDate} ({data.region})
        </Text>
      )}
    </Flex>
  );
}

function MovieTrailer({ id }) {
  const { data: trailers } = useMovieTrailers({ id });

  const trailerToDisplay = trailers?.reduce((prev, current) =>
    new Date(prev?.publishedAt) > new Date(current?.publishedAt)
      ? prev
      : current
  );

  return (
    <Flex>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Flex gap={2} align="center">
              <PlayIcon /> Trailer
            </Flex>
          </Button>
        </DialogTrigger>
        <DialogContent
          css={{
            p: '$6',
            bg: '$sage3'
          }}
        >
          <Box
            css={{
              '@bp1': { width: 272, height: 153 },
              '@bp2': { width: 480, height: 270 },
              '@bp3': { width: 560, height: 315 },
              '@bp4': { width: 752, height: 423 }
            }}
          >
            <iframe
              title="Youtube Trailer"
              width="100%"
              height="100%"
              src={`https://www.youtube-nocookie.com/embed/${trailerToDisplay?.key}`}
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Flex>
  );
}

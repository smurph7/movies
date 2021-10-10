import * as React from 'react';
import { useRouter } from 'next/router';
import NextImage from 'next/image';

import { Layout } from '~/components/common';
import { Container, Box, Text, Flex, Grid, Button } from '~/components/ui';
import { useMovie } from '~/components/movies/hooks';

export default function Movie() {
  const router = useRouter();
  const { slug } = router.query;

  const splitSlug = slug?.split('-');
  const id = splitSlug ? splitSlug[splitSlug?.length - 1] : undefined;

  const movieQuery = useMovie({ id });
  const { data: movie } = movieQuery;

  return (
    <Layout>
      {movieQuery.isLoading ? 'Loading...' : <MovieBanner movie={movie} />}
    </Layout>
  );
}

function MovieBanner({ movie }) {
  if (!movie) {
    return null;
  }

  return (
    <Box
      css={{
        width: '100%',
        height: 600,
        position: 'relative'
      }}
    >
      <Box
        css={{
          position: 'absolute',
          bg: 'rgba(106, 113, 110, 0.8)',
          width: '100%',
          height: '100%',
          zIndex: 1
        }}
      />
      <NextImage
        src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}original${movie?.backdropPath}`}
        layout="fill"
        objectFit="cover"
        objectPosition="top"
      />
      <Container size={5} css={{ height: '100%' }}>
        <Box
          css={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            height: '100%'
          }}
        >
          <Grid
            align="center"
            justify="start"
            flow="column"
            columns={2}
            gap={5}
            css={{ float: 'left', left: '25%', height: '100%' }}
          >
            <Flex align="center" justify="center">
              <Flex direction="column" css={{}}>
                <NextImage
                  className={movie.watchProviders ? 'top-rounded' : 'rounded'}
                  src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}w500${movie?.posterPath}`}
                  width={300}
                  height={450}
                />
                {movie.watchProviders && (
                  <WatchProviderButton watchProviders={movie.watchProviders} />
                )}
              </Flex>
            </Flex>
            <MovieBannerDetails movie={movie} />
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

function WatchProviderButton({ watchProviders }) {
  if (!watchProviders) {
    return null;
  }

  const allProviders = [...watchProviders?.flatrate, ...watchProviders.buy];

  const providerToDisplay = allProviders.reduce((prev, current) =>
    prev.displayPriority < current.displayPriority ? prev : current
  );

  return (
    <Button
      variant="reset"
      css={{
        width: '100%',
        height: '100%',
        bg: '$green9',
        p: '$4',
        borderBottomLeftRadius: '$4',
        borderBottomRightRadius: '$4',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
      }}
    >
      <Flex align="center" justify="center" gap={0}>
        <NextImage
          className="rounded"
          src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}w92${providerToDisplay.logoPath}`}
          width={60}
          height={60}
        />
        <Flex
          direction="column"
          gap={1}
          css={{ width: '100%', textAlign: 'center' }}
        >
          <Text color="contrast">Available on</Text>
          <Text color="contrast">{providerToDisplay.providerName}</Text>
        </Flex>
      </Flex>
    </Button>
  );
}

function MovieBannerDetails({ movie }) {
  return (
    <Flex>
      <Text>{movie?.title}</Text>
      <Text>{movie?.title}</Text>
      <Text>{movie?.title}</Text>
      <Text>{movie?.title}</Text>
      <Text>{movie?.title}</Text>
    </Flex>
  );
}

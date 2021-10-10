import * as React from 'react';
import { useRouter } from 'next/router';
import NextImage from 'next/image';

import { Layout } from '~/components/common';
import { Container, Box, Text, Flex, Grid, Button } from '~/components/ui';
import { useMovie, useReleaseDates } from '~/components/movies/hooks';
import { IMAGE_BASE_URL } from '~/utils/config';

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
        src={`${IMAGE_BASE_URL}original${movie.backdropPath}`}
        alt={`${movie.title}-backdrop`}
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
            <MovieBannerImage
              title={movie.title}
              src={movie.posterPath}
              watchProviders={movie.watchProviders}
            />
            <MovieBannerDetails movie={movie} />
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

function MovieBannerImage({ title, src, watchProviders }) {
  return (
    <Flex align="center" justify="center">
      <Flex direction="column">
        <NextImage
          className={watchProviders ? 'top-rounded' : 'rounded'}
          src={`${IMAGE_BASE_URL}w500${src}`}
          alt={`${title}-poster`}
          width={300}
          height={450}
        />
        {watchProviders && (
          <WatchProviderButton watchProviders={watchProviders} />
        )}
      </Flex>
    </Flex>
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
        p: '$3',
        borderBottomLeftRadius: '$4',
        borderBottomRightRadius: '$4',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
      }}
    >
      <Flex align="center" justify="center" gap={0}>
        <NextImage
          className="rounded"
          src={`${IMAGE_BASE_URL}w92${providerToDisplay.logoPath}`}
          alt={`${providerToDisplay.providerName}-logo`}
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
  if (!movie) {
    return null;
  }

  return (
    <Flex direction="column" gap={3}>
      <Text heading color="lightGray" fontSize={6}>
        {movie.title} ({movie.releaseYear})
      </Text>
      <ReleaseDates id={movie.id} />
    </Flex>
  );
}

function ReleaseDates({ id }) {
  const { data } = useReleaseDates({ id });

  if (!data) {
    return null;
  }
  const releaseDate = new Intl.DateTimeFormat('en-AU').format(
    new Date(data.releaseDate)
  );

  return (
    <Flex align="center" gap={1}>
      <Box css={{ border: '1px solid $sage1', p: '$1' }}>
        <Text color="lightGray" fontSize={2}>
          {data.certification}
        </Text>
      </Box>
      <Text color="lightGray" fontSize={2}>
        {releaseDate} ({data.region})
      </Text>
    </Flex>
  );
}

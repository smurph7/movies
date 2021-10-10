import * as React from 'react';
import { useRouter } from 'next/router';
import NextImage from 'next/image';
import axios from 'axios';
import { getPlaiceholder } from 'plaiceholder';

import { Layout } from '~/components/common';
import {
  Container,
  Box,
  Text,
  Flex,
  Grid,
  Button,
  Placeholder
} from '~/components/ui';
import { useMovie, useReleaseDates } from '~/components/movies/hooks';
import { IMAGE_BASE_URL } from '~/utils/config';
import { FavouriteButton } from '~/components/movies';

export async function getStaticProps({ params }) {
  const splitSlug = params.slug?.split('-');
  const id = splitSlug ? splitSlug[splitSlug?.length - 1] : undefined;
  let movie;
  let base64;
  let img;

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=watch/providers`
    );
    const placeholder = await getPlaiceholder(
      `${IMAGE_BASE_URL}original${data.backdrop_path}`
    );
    base64 = placeholder.base64;
    img = placeholder.img;
    movie = data;
  } catch (error) {
    movie = {};
    img = {};
    base64 = {};
  }

  return {
    props: {
      movie,
      imageProps: {
        ...img,
        blurDataURL: base64
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
        <MovieBanner imageProps={imageProps} movie={movieQuery.data} />
      )}
    </Layout>
  );
}

function MovieBanner({ imageProps, movie }) {
  const [bg, setBg] = React.useState();
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
          bg,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}
      />
      <NextImage
        src={
          movie.backdropPath
            ? `${IMAGE_BASE_URL}original${movie.backdropPath}`
            : '/movie-poster-placeholder.svg'
        }
        alt={`${movie.title}-backdrop`}
        layout="fill"
        objectFit="cover"
        objectPosition="top"
        priority
        placeholder="blur"
        blurDataURL={imageProps?.blurDataURL}
        onLoad={() => setBg('rgba(42,47,44,0.9)')}
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
            flow={{ '@bp1': 'row', '@bp3': 'column' }}
            gap={5}
            css={{
              '@bp3': { float: 'left', left: '25%', height: '100%' }
            }}
          >
            <MovieBannerImage
              id={movie.id}
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

function MovieBannerImage({ id, title, src, watchProviders }) {
  return (
    <Flex align="center" justify="center">
      <Flex direction="column" css={{ position: 'relative' }}>
        <NextImage
          className={watchProviders ? 'top-rounded' : 'rounded'}
          src={
            src
              ? `${IMAGE_BASE_URL}w500${src}`
              : '/movie-poster-placeholder.svg'
          }
          alt={`${title}-poster`}
          width={300}
          height={450}
          priority
        />
        {watchProviders && (
          <WatchProviderButton watchProviders={watchProviders} />
        )}
        <FavouriteButton movieId={id} />
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
        bg: '$sage1',
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
      <Flex direction="column" gap={5}>
        <ReleaseDates id={movie.id} />
        <Text color="lightGray" italic>
          {movie.tagline}
        </Text>
        <Flex direction="column" gap={3}>
          <Text color="lightGray" heading>
            Overview
          </Text>
          <Text color="lightGray">{movie.overview}</Text>
        </Flex>
      </Flex>
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
      {data.certification !== '' && (
        <Box css={{ border: '1px solid $sageNoDark', p: '$1' }}>
          <Text color="lightGray" fontSize={2}>
            {data.certification}
          </Text>
        </Box>
      )}
      <Text color="lightGray" fontSize={2}>
        {releaseDate} ({data.region})
      </Text>
    </Flex>
  );
}

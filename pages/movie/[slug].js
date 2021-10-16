import * as React from 'react';
import { useRouter } from 'next/router';
import NextImage from 'next/image';
import axios from 'axios';
import { getPlaiceholder } from 'plaiceholder';

import { Layout } from '~/features/common/components';
import {
  Container,
  Box,
  Text,
  Flex,
  Grid,
  Button,
  Placeholder
} from '~/features/ui';
import { FavouriteButton } from '~/features/favourites/components';
import { useMovie, useReleaseDates } from '~/features/movies/queries';
import { MovieProvider, useMovieContext } from '~/features/movies/hooks';
import { useThemeChange } from '~/features/ui/theme-change-button/hooks';
import { Media } from '~/styles/media';
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
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=watch/providers`
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
          <MovieBanner imageProps={imageProps} movie={movieQuery.data} />
          <Container size={5} css={{ height: '100%' }}>
            <Box>hello there</Box>
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

function MovieBanner({ imageProps, movie }) {
  const isMobile = useBreakpoint('bp3');
  const [bg, setBg] = React.useState('rgba(42,47,44,0.6)');
  const [isOpen, setIsOpen] = React.useState(false);

  if (!movie) {
    return null;
  }

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <MovieProvider value={{ isOpen, handleOpen, handleClose }}>
      <Box
        css={{
          width: '100%',
          height: isMobile ? 'auto' : 600,
          position: 'relative'
        }}
      >
        <Media greaterThanOrEqual="bp3">
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
            blurDataURL={imageProps.bgBlurDataUrl}
            onLoad={() => setBg('rgba(42,47,44,0.9)')}
          />
        </Media>
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
                imageProps={imageProps}
                watchProviders={movie.watchProviders}
              />
              <MovieBannerDetails movie={movie} />
            </Grid>
          </Box>
        </Container>
      </Box>
    </MovieProvider>
  );
}

function MovieBannerImage({ id, title, src, imageProps, watchProviders }) {
  const { isOpen, handleOpen } = useMovieContext();
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
          placeholder="blur"
          blurDataURL={imageProps.posterBlurDataUrl}
        />
        {watchProviders && !isOpen && (
          <WatchProviderButton
            watchProviders={watchProviders}
            handleOpen={handleOpen}
          />
        )}
        <FavouriteButton movieId={id} />
      </Flex>
    </Flex>
  );
}

function WatchProviderButton({ watchProviders }) {
  const { handleOpen } = useMovieContext();
  if (!watchProviders) {
    return null;
  }

  const allProviders = [...watchProviders?.flatrate, ...watchProviders?.buy];

  const providerToDisplay = allProviders.reduce((prev, current) =>
    prev.displayPriority < current.displayPriority ? prev : current
  );

  return (
    <Button
      variant="reset"
      aria-label="Watch Providers"
      css={{
        width: '100%',
        height: '100%',
        bg: '$sage3',
        p: '$3',
        borderBottomLeftRadius: '$4',
        borderBottomRightRadius: '$4',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
      }}
      onClick={handleOpen}
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
          <Text color="contrast" fontSize={2}>
            Available on
          </Text>
          <Text color="contrast" fontWeight="$bold">
            {providerToDisplay.providerName}
          </Text>
        </Flex>
      </Flex>
    </Button>
  );
}

function WatchProviders() {
  return <Flex css={{ bg: '$indigo9' }}>overlay</Flex>;
}

function MovieBannerDetails({ movie }) {
  const { isOpen } = useMovieContext();
  const isMobile = useBreakpoint('bp3');
  const { theme } = useThemeChange();
  const color = isMobile ? 'gray' : 'lightGray';
  if (!movie) {
    return null;
  }

  return isOpen ? (
    <WatchProviders />
  ) : (
    <Flex
      direction="column"
      gap={3}
      css={{ bg: isMobile && theme === 'theme-default' && '$sage11' }}
    >
      <Text heading color={color} fontSize={6}>
        {movie.title} ({movie.releaseYear})
      </Text>
      <Flex direction="column" gap={5}>
        <ReleaseDates id={movie.id} />
        <Text color={color} italic>
          {movie.tagline}
        </Text>
        <Flex direction="column" gap={3}>
          <Text color={color} heading>
            Overview
          </Text>
          <Text color={color} css={{ lineHeight: 1.2 }}>
            {movie.overview}
          </Text>
        </Flex>
      </Flex>
    </Flex>
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

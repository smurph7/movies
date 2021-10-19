import * as React from 'react';
import NextImage from 'next/image';

import { WatchProviderButton } from '../watch-provider-button';

import { Container, Box, Text, Flex, Grid, Button } from '~/features/ui';
import { FavouriteButton } from '~/features/favourites/components';
import { ReleaseDates, MovieTrailer } from '~/features/movies/components';
import { useMovieWatchProviders } from '~/features/movies/queries';
import { useThemeStore } from '~/features/ui/theme-change-button/use-theme-store';
import { useBreakpoint } from '~/utils/use-breakpoint';
import { IMAGE_BASE_URL } from '~/utils/config';
import { Media } from '~/styles/media';

export function MovieBanner({ ...props }) {
  const isMobile = useBreakpoint('bp3');

  return (
    <Box
      {...props}
      css={{
        width: '100%',
        height: isMobile ? 'auto' : 600,
        position: 'relative'
      }}
    />
  );
}

export function MovieBannerBackdrop({ title, backdropPath, bgBlurDataUrl }) {
  const [bg, setBg] = React.useState('rgba(42,47,44,0.6)');
  return (
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
          backdropPath
            ? `${IMAGE_BASE_URL}original${backdropPath}`
            : '/movie-poster-placeholder.svg'
        }
        alt={`${title}-backdrop`}
        layout="fill"
        objectFit="cover"
        objectPosition="top"
        priority
        placeholder="blur"
        blurDataURL={bgBlurDataUrl}
        onLoad={() => setBg('rgba(42,47,44,0.9)')}
      />
    </Media>
  );
}

export function MovieBannerDetailSection({ children }) {
  return (
    <Container size={5} css={{ height: '100%' }}>
      <Box
        css={{
          position: 'relative',
          zIndex: 10,
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
          {children}
        </Grid>
      </Box>
    </Container>
  );
}

export function MovieBannerImage({ id, title, src, posterBlurDataUrl }) {
  const { data: watchProviders } = useMovieWatchProviders({ id });
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
          blurDataURL={posterBlurDataUrl}
        />
        <WatchProviderButton watchProviders={watchProviders} />
        <FavouriteButton id={id} />
      </Flex>
    </Flex>
  );
}

export function MovieBannerDetails({ movie }) {
  const isMobile = useBreakpoint('bp3');
  const theme = useThemeStore(state => state.theme);

  const number = new Intl.NumberFormat('en-US');

  return (
    <Flex direction="column" justify="center" gap={8} css={{ height: '100%' }}>
      <Flex
        direction="column"
        justify="center"
        gap={3}
        css={{
          bg: isMobile && theme === 'theme-default' && '$sage11'
        }}
      >
        <Text heading color="lightGray" fontSize={6}>
          {movie.title} {movie.releaseYear && `(${movie.releaseYear})`}
        </Text>
        <Flex direction="column" gap={5}>
          <ReleaseDates id={movie.id} />
          <MovieTrailer id={movie.id} />
          <Flex gap={2} wrap="wrap">
            {movie.genres.length > 0 &&
              movie.genres.map(genre => (
                <Button
                  key={genre.name}
                  css={{ bg: '$sage11NoDark', boxShadow: 'none' }}
                >
                  <Text fontSize={1} color="lightGray">
                    {genre.name}
                  </Text>
                </Button>
              ))}
          </Flex>
          {movie.tagline && (
            <Text color="lightGray" italic>
              {movie.tagline}
            </Text>
          )}
          {movie.overview && (
            <Flex direction="column" gap={3}>
              <Text color="lightGray" heading>
                Overview
              </Text>
              <Text color="lightGray" css={{ lineHeight: 1.2 }}>
                {movie.overview}
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
      <Flex gap={5}>
        {movie.voteAverage && (
          <Flex direction="column" gap={2}>
            <Text color="lightGray" fontWeight="bold" fontSize={2}>
              User score
            </Text>
            <Text color="lightGray" fontSize={2}>
              {Math.round((movie.voteAverage / 10) * 100)}%
            </Text>
          </Flex>
        )}
        {movie.status && (
          <Flex direction="column" gap={2}>
            <Text color="lightGray" fontWeight="bold" fontSize={2}>
              Status
            </Text>
            <Text color="lightGray" fontSize={2}>
              {movie.status}
            </Text>
          </Flex>
        )}
        {movie.runtime && (
          <Flex direction="column" gap={2}>
            <Text color="lightGray" fontWeight="bold" fontSize={2}>
              Run Time
            </Text>
            <Text color="lightGray" fontSize={2}>
              {movie.runtime}
            </Text>
          </Flex>
        )}
        {!!movie.budget && movie.budget > 0 && (
          <Flex direction="column" gap={2}>
            <Text color="lightGray" fontWeight="bold" fontSize={2}>
              Budget
            </Text>
            <Text color="lightGray" fontSize={2}>
              ${number.format(movie.budget)} (USD)
            </Text>
          </Flex>
        )}
        {!!movie.revenue && movie.revenue > 0 && (
          <Flex direction="column" gap={2}>
            <Text color="lightGray" fontWeight="bold" fontSize={2}>
              Revenue
            </Text>
            <Text color="lightGray" fontSize={2}>
              ${number.format(movie.revenue)} (USD)
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

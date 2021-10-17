import * as React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import NextImage from 'next/image';
import { getPlaiceholder } from 'plaiceholder';

import { Layout } from '~/features/common/components';
import {
  Container,
  Box,
  Text,
  Flex,
  Grid,
  Button,
  Placeholder,
  FloatingCard
} from '~/features/ui';
import { FavouriteButton } from '~/features/favourites/components';
import { useMovie, useReleaseDates } from '~/features/movies/queries';
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
            {/* more info ... genre */}
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

function MovieBanner({ ...props }) {
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

function MovieBannerBackdrop({ title, backdropPath, bgBlurDataUrl }) {
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

function MovieBannerDetailSection({ children }) {
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

function MovieBannerImage({
  id,
  title,
  src,
  posterBlurDataUrl,
  watchProviders
}) {
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

  const allProviders = [...watchProviders?.flatrate, ...watchProviders?.buy];

  const providerToDisplay = allProviders.reduce((prev, current) =>
    prev.displayPriority < current.displayPriority ? prev : current
  );

  return (
    // alert before new page with warning
    // <a href={watchProviders?.link} target="_blank" rel="noreferrer">
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

function MovieBannerDetails({ movie }) {
  const isMobile = useBreakpoint('bp3');
  const { theme } = useThemeChange();
  const color = isMobile ? 'gray' : 'lightGray';

  return (
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

import * as React from 'react';
import NextLink from 'next/link';
import NextImage from 'next/image';

import { Box, Flex, Text, Card, Link, Placeholder } from '~/components/ui';
import { usePrefetchMovie } from '~/components/movies/hooks';
import { getUrlFromString } from '~/utils/get-url-from-string';

export function MovieCard({ movie, isLoading }) {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  const href = `/movie/${getUrlFromString(movie?.title)}-${movie?.id}`;

  const { handlePrefetch } = usePrefetchMovie();

  function handlePrefetchMovie() {
    handlePrefetch({ id: `${movie.id}` });
  }

  if (isLoading) {
    return (
      <Card>
        <Placeholder width="100%" height="100%" />
      </Card>
    );
  }

  return (
    <NextLink href={href} passHref>
      <Link href={href} variant="blank" css={{ color: '$contrast' }}>
        <Card bounceOnHover onMouseEnter={handlePrefetchMovie}>
          <Box css={{ position: 'relative', width: '100%', height: '100%' }}>
            <NextImage
              src={
                movie.posterPath
                  ? `${imageBaseUrl}${movie.posterPath}`
                  : '/movie-poster-placeholder.svg'
              }
              alt={movie.title}
              layout="fill"
              objectFit="cover"
              priority
            />
            {!movie.posterPath && (
              <Flex
                align="center"
                justify="center"
                css={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  zIndex: 1,
                  pt: 100
                }}
              >
                <Text>
                  {movie.title} ({movie.releaseYear})
                </Text>
              </Flex>
            )}
          </Box>
        </Card>
      </Link>
    </NextLink>
  );
}

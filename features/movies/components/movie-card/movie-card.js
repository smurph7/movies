import * as React from 'react';
import NextLink from 'next/link';
import NextImage from 'next/image';

import { Box, Flex, Text, Card, Placeholder } from '~/features/ui';
import { FavouriteButton } from '~/features/favourites/components';
import { usePrefetchMovie } from '~/features/movies/queries';
import { getUrlFromString } from '~/utils/get-url-from-string';
import { IMAGE_BASE_URL } from '~/utils/config';

export function MovieCard({ movie, isLoading, ...props }) {
  const imageBaseUrl = `${IMAGE_BASE_URL}w342`;

  const href = `/movie/${getUrlFromString(movie?.title)}-${movie?.id}`;

  const { handlePrefetch: prefetchMovie } = usePrefetchMovie();

  function handlePrefetch() {
    prefetchMovie({ id: `${movie?.id}` });
  }

  if (isLoading) {
    return (
      <Card {...props}>
        <Placeholder width="100%" height="100%" />
      </Card>
    );
  }

  return (
    <Card bounceOnHover onMouseEnter={handlePrefetch} {...props}>
      <Box css={{ position: 'relative', width: '100%', height: '100%' }}>
        <NextLink href={href}>
          <Box
            css={{
              height: '100%',
              color: '$contrast',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <NextImage
              src={
                movie?.posterPath
                  ? `${imageBaseUrl}${movie?.posterPath}`
                  : '/movie-poster-placeholder.svg'
              }
              alt={movie?.title ?? 'poster-placeholder'}
              layout="fill"
              objectFit="cover"
              priority
            />
            {!movie?.posterPath && (
              <Flex
                align="center"
                justify="center"
                css={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  zIndex: 1,
                  textAlign: 'center',
                  '@bp1': { pt: '$10' },
                  '@bp2': { pt: '$8' }
                }}
              >
                <Text color="gray">
                  {movie?.title} ({movie?.releaseYear})
                </Text>
              </Flex>
            )}
            <FavouriteButton id={movie?.id} />
          </Box>
        </NextLink>
      </Box>
    </Card>
  );
}

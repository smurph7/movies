import * as React from 'react';
import NextLink from 'next/link';
import NextImage from 'next/image';

import { Box, Flex, Text, Card, Placeholder } from '~/features/ui';
import { FavouriteButton } from '~/features/favourites/components';
import { usePrefetchMovie } from '~/features/movies/queries';
import { getUrlFromString } from '~/utils/get-url-from-string';
import { IMAGE_BASE_URL } from '~/utils/config';

export function MovieCard({ movie, isLoading }) {
  const imageBaseUrl = `${IMAGE_BASE_URL}w342`;

  const href = `/movie/${getUrlFromString(movie?.title)}-${movie?.id}`;

  const { handlePrefetch } = usePrefetchMovie();

  function handlePrefetchMovie() {
    handlePrefetch({ id: `${movie?.id}` });
  }

  if (isLoading) {
    return (
      <Card>
        <Placeholder width="100%" height="100%" />
      </Card>
    );
  }

  return (
    <Card bounceOnHover onMouseEnter={handlePrefetchMovie}>
      <Box css={{ position: 'relative', width: '100%', height: '100%' }}>
        <NextLink href={href}>
          <Box
            css={{
              height: '100%',
              color: '$contrast',
              cursor: 'pointer'
            }}
          >
            <NextImage
              src={
                movie?.posterPath
                  ? `${imageBaseUrl}${movie?.posterPath}`
                  : '/movie-poster-placeholder.svg'
              }
              alt={movie?.title}
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
                  pt: '$10',
                  textAlign: 'center'
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

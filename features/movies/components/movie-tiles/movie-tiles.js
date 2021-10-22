import * as React from 'react';

import { MovieCard } from '../movie-card';

import { Container, Flex, Grid, Text } from '~/features/ui';

export function MovieTiles({ title, movies, isLoading, placeholderLength }) {
  const placeholders = [...Array.from({ length: placeholderLength })];
  const movieArray = movies ?? placeholders;
  return (
    <Container size={6} css={{ pt: '$5' }}>
      <Flex direction="column" gap={4} align="center">
        <Text heading fontSize={5}>
          {title}
        </Text>
        <Grid
          columns={{
            '@bp1': '3',
            '@bp2': '3',
            '@bp3': '5'
          }}
          gap={{ '@bp1': 3, '@bp2': 1, '@bp3': 2 }}
        >
          {movieArray?.map((movie, index) => (
            <MovieCard
              key={`${movie?.id}-${index}`}
              movie={movie}
              isLoading={isLoading}
            />
          ))}
        </Grid>
      </Flex>
    </Container>
  );
}

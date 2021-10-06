import * as React from 'react';

import { MovieCard } from '../movie-card';

import { Container, Flex, Grid, Text } from '~/components/ui';

export function MovieTiles({ title, movies, isLoading }) {
  return (
    <Container size={5} css={{ pt: '$5' }}>
      <Flex direction="column" gap={2} align="center">
        <Text heading fontSize={5}>
          {title}
        </Text>
        <Grid
          columns={{
            '@bp2': '2',
            '@bp3': '3',
            '@bp4': '5',
            '@bp5': '5'
          }}
          gap={{ '@bp1': 3, '@bp3': 2 }}
        >
          {movies?.map(movie => (
            <MovieCard key={movie.id} movie={movie} isLoading={isLoading} />
          ))}
        </Grid>
      </Flex>
    </Container>
  );
}

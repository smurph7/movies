import * as React from 'react';

import { MovieCard } from '../movie-card';

import { Container, Flex, Grid, Text } from '~/components/ui';

export function MovieTiles({ title, movies, isLoading }) {
  return (
    <Container size={4} css={{ width: '100%' }}>
      <Flex direction="column" gap={2}>
        <Text heading fontSize={5}>
          {title}
        </Text>
        <Grid columns={{ '@bp3': '5' }} gap={{ '@bp1': 3, '@bp3': 2 }}>
          {movies?.slice(0, 5)?.map(movie => (
            <MovieCard key={movie.id} movie={movie} isLoading={isLoading} />
          ))}
        </Grid>
      </Flex>
    </Container>
  );
}

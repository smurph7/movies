import * as React from 'react';

import { Box, Container, Text, Flex, Grid, Card } from '~/components/ui';
import { MovieTiles } from '~/components/movies';
import {
  useNowPlayingMovies,
  usePopularMovies,
  useTrendingMovies,
  useUpcomingMovies
} from '~/components/movies/hooks';

export default function Home() {
  return (
    <>
      <Box
        css={{
          bg: '$cream',
          color: '$gray400',
          p: '$4',
          display: 'flex'
        }}
      >
        <Flex
          direction="row"
          justify="space-between"
          align="center"
          css={{ width: '100%' }}
        >
          <Text heading>Movies</Text>
          <Flex direction="row" gap={2}>
            <Text>Favourites</Text>
            <Text>Profile</Text>
          </Flex>
        </Flex>
      </Box>
      <Box css={{ bg: '$background', pt: '$3', width: '100%' }}>
        <Flex direction="column" gap={5}>
          <PopularMovieSection />
          <TrendingMovieSection />
          <NowPlayingMovieSection />
          <UpcomingMovieSection />
        </Flex>
      </Box>
    </>
  );
}

function PopularMovieSection() {
  const popularMoviesQuery = usePopularMovies();
  return (
    <MovieTiles
      title="Popular"
      movies={popularMoviesQuery.data?.results}
      isLoading={popularMoviesQuery.isLoading}
    />
  );
}

function TrendingMovieSection() {
  const trendingMoviesQuery = useTrendingMovies();
  return (
    <MovieTiles
      title="Trending"
      movies={trendingMoviesQuery.data?.results}
      isLoading={trendingMoviesQuery.isLoading}
    />
  );
}

function NowPlayingMovieSection() {
  const nowPlayingMoviesQuery = useNowPlayingMovies();
  return (
    <MovieTiles
      title="Now Playing"
      movies={nowPlayingMoviesQuery.data?.results}
      isLoading={nowPlayingMoviesQuery.isLoading}
    />
  );
}

function UpcomingMovieSection() {
  const upcomingMoviesQuery = useUpcomingMovies();
  return (
    <MovieTiles
      title="Upcoming"
      movies={upcomingMoviesQuery.data?.results}
      isLoading={upcomingMoviesQuery.isLoading}
    />
  );
}

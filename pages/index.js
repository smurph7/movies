import * as React from 'react';

import { Box, Text, Flex, ScrollableContainer } from '~/components/ui';
import { MovieCard } from '~/components/movies';
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
    <ScrollableContainer title="Popular">
      {popularMoviesQuery.data?.results.map(movie => (
        <MovieCard movie={movie} isLoading={popularMoviesQuery.isLoading} />
      ))}
    </ScrollableContainer>
  );
}

function TrendingMovieSection() {
  const trendingMoviesQuery = useTrendingMovies();
  return (
    <ScrollableContainer title="Trending">
      {trendingMoviesQuery.data?.results.map(movie => (
        <MovieCard movie={movie} isLoading={trendingMoviesQuery.isLoading} />
      ))}
    </ScrollableContainer>
  );
}

function NowPlayingMovieSection() {
  const nowPlayingMoviesQuery = useNowPlayingMovies();
  return (
    <ScrollableContainer title="Now Playing">
      {nowPlayingMoviesQuery.data?.results.map(movie => (
        <MovieCard movie={movie} isLoading={nowPlayingMoviesQuery.isLoading} />
      ))}
    </ScrollableContainer>
  );
}

function UpcomingMovieSection() {
  const upcomingMoviesQuery = useUpcomingMovies();
  return (
    <ScrollableContainer title="Upcoming">
      {upcomingMoviesQuery.data?.results.map(movie => (
        <MovieCard movie={movie} isLoading={upcomingMoviesQuery.isLoading} />
      ))}
    </ScrollableContainer>
  );
}

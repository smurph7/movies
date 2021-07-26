import * as React from 'react';

import {
  Box,
  Text,
  Flex,
  HorizontalScroll,
  Link,
  DarkThemeButton
} from '~/components/ui';
import { MovieCard } from '~/components/movies';
import {
  useNowPlayingMovies,
  usePopularMovies,
  useTrendingMovies,
  useUpcomingMovies
} from '~/components/movies/hooks';

// TODO color scheme needs work - look at radix/colors
// TODO use Radix icons
// TODO scroll buttons

const NUMBER_OF_PLACEHOLDERS = 6;

export default function Home() {
  return (
    <Box>
      <Box
        css={{
          bg: '$sage9',
          color: '$sage',
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
          <Link href="/">
            <Text heading>Movies</Text>
          </Link>
          <Flex direction="row" align="center" gap={2}>
            {/* <Link href="/">
              <Text>Favourites</Text>
            </Link>
            <Link href="/">
              <Text>Profile</Text>
            </Link> */}
          </Flex>
        </Flex>
      </Box>

      <Box css={{ bg: '$sage2', pt: '$3', width: '100%' }}>
        <DarkThemeButton />
        <Flex direction="column" gap={5}>
          <PopularMovieSection />
          <UpcomingMovieSection />
          <NowPlayingMovieSection />
          <TrendingMovieSection />
        </Flex>
      </Box>
    </Box>
  );
}

function PopularMovieSection() {
  const popularMoviesQuery = usePopularMovies();
  return (
    <MovieSection
      title="Popular"
      results={
        popularMoviesQuery.data?.results ??
        Array.from(Array(NUMBER_OF_PLACEHOLDERS))
      }
      isLoading={popularMoviesQuery.isLoading}
    />
  );
}

function TrendingMovieSection() {
  const trendingMoviesQuery = useTrendingMovies();
  return (
    <MovieSection
      title="Trending"
      results={
        trendingMoviesQuery.data?.results ??
        Array.from(Array(NUMBER_OF_PLACEHOLDERS))
      }
      isLoading={trendingMoviesQuery.isLoading}
    />
  );
}

function NowPlayingMovieSection() {
  const nowPlayingMoviesQuery = useNowPlayingMovies();
  return (
    <MovieSection
      title="Now Playing"
      results={
        nowPlayingMoviesQuery.data?.results ??
        Array.from(Array(NUMBER_OF_PLACEHOLDERS))
      }
      isLoading={nowPlayingMoviesQuery.isLoading}
    />
  );
}

function UpcomingMovieSection() {
  const upcomingMoviesQuery = useUpcomingMovies();
  return (
    <MovieSection
      title="Upcoming"
      results={
        upcomingMoviesQuery.data?.results ??
        Array.from(Array(NUMBER_OF_PLACEHOLDERS))
      }
      isLoading={upcomingMoviesQuery.isLoading}
    />
  );
}

function MovieSection({ title, results, isLoading }) {
  return (
    <HorizontalScroll title={title}>
      {results.map((movie, index) => (
        <MovieCard
          key={movie?.id ?? index}
          movie={movie}
          isLoading={isLoading}
        />
      ))}
    </HorizontalScroll>
  );
}

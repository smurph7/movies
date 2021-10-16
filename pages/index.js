import * as React from 'react';

import { Container, StyledCarousel, Flex, Text } from '~/components/ui';
import { Layout } from '~/components/common';
import { MovieCard } from '~/components/movies';
import {
  useNowPlayingMovies,
  usePopularMovies,
  useTrendingMovies,
  useUpcomingMovies
} from '~/components/movies/hooks';

const NUMBER_OF_PLACEHOLDERS = 6;

export default function Home() {
  return (
    <Layout>
      <Flex direction="column" align="center" gap={5} css={{ pt: '$3' }}>
        <PopularMovieSection />
        <UpcomingMovieSection />
        <NowPlayingMovieSection />
        <TrendingMovieSection />
      </Flex>
    </Layout>
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
    <Container size={{ '@bp1': 1, '@bp2': 2, '@bp3': 3, '@bp4': 4, '@bp5': 5 }}>
      <Flex direction="column" gap={1}>
        <Text heading fontSize={5} css={{ pl: '$1' }}>
          {title}
        </Text>
        <StyledCarousel>
          {results.map((movie, index) => (
            <MovieCard
              key={movie?.id ?? index}
              movie={movie}
              isLoading={isLoading}
            />
          ))}
        </StyledCarousel>
      </Flex>
    </Container>
  );
}

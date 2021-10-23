import * as React from 'react';
import axios from 'axios';

import { Container, StyledCarousel, Flex, Text } from '~/features/ui';
import { Layout, Metadata } from '~/features/common/components';
import { MovieCard } from '~/features/movies/components';
import {
  useNowPlayingMovies,
  usePopularMovies,
  useTrendingMovies,
  useUpcomingMovies
} from '~/features/movies/queries';
import { transformMoviesData } from '~/features/movies/utils/transform-movie-data';

export async function getStaticProps() {
  let popular;
  // let upcoming;
  // let nowPlaying;
  // let trending;

  try {
    const { data: popularMovies } = await axios.get(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/popular?region=AU`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
        }
      }
    );
    popular = transformMoviesData(popularMovies);
  } catch (error) {
    popular = {};
  }

  return {
    props: {
      popular
    },
    revalidate: 60 * 60
  };
}

const NUMBER_OF_PLACEHOLDERS = 6;

export default function Home({ popular }) {
  return (
    <>
      <Metadata
        title="Home"
        description="Welcome to Movies! Search for information about all of your favourite movies."
      />
      <Layout>
        <Flex direction="column" align="center" gap={5} css={{ pt: '$3' }}>
          <PopularMovieSection popular={popular} />
          <UpcomingMovieSection />
          <NowPlayingMovieSection />
          <TrendingMovieSection />
        </Flex>
      </Layout>
    </>
  );
}

function PopularMovieSection({ popular }) {
  console.log('popular', popular);
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
              css={{
                '@bp1': {
                  width: '170px',
                  height: '255px'
                }
              }}
            />
          ))}
        </StyledCarousel>
      </Flex>
    </Container>
  );
}

import { useQuery } from 'react-query';
import axios from 'axios';

import { transformMovieData } from './transform-movie-data';

export async function fetchTrendingMovies() {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  return data;
}

export function useTrendingMovies() {
  return useQuery(['trending'], fetchTrendingMovies, {
    select: data => transformMovieData(data)
  });
}
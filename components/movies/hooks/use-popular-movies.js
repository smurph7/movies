import { useQuery } from 'react-query';
import axios from 'axios';

import { transformMovieData } from './transform-movie-data';

export async function fetchPopularMovies() {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&region=AU`
  );
  return data;
}

export function usePopularMovies() {
  return useQuery(['popular'], fetchPopularMovies, {
    select: data => transformMovieData(data)
  });
}

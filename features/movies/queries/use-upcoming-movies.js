import { useQuery } from 'react-query';
import axios from 'axios';

import { transformMoviesData } from '../utils/transform-movie-data';

export async function fetchUpcomingMovies() {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&region=AU`
  );
  return data;
}

export function useUpcomingMovies() {
  return useQuery(['upcoming'], fetchUpcomingMovies, {
    select: data => transformMoviesData(data)
  });
}

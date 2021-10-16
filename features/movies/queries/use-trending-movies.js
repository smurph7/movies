import { useQuery } from 'react-query';

import { moviesAxios } from '../../../api-client';
import { transformMoviesData } from '../utils/transform-movie-data';

export async function fetchTrendingMovies() {
  const { data } = await moviesAxios.get(`/trending/movie/day?region=AU`);

  return data;
}

export function useTrendingMovies() {
  return useQuery(['trending'], fetchTrendingMovies, {
    select: data => transformMoviesData(data)
  });
}

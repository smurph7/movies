import { useQuery } from 'react-query';

import { moviesAxios } from '../../../api-client';
import { transformMoviesData } from '../utils/transform-movie-data';

export async function fetchTrendingMovies() {
  const { data } = await moviesAxios.get(`/trending/movie/day?region=AU`);

  return transformMoviesData(data);
}

export function useTrendingMovies({ trending } = {}) {
  return useQuery(['trending'], fetchTrendingMovies, {
    initialData: trending
  });
}

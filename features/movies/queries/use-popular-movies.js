import { useQuery } from 'react-query';

import { moviesAxios } from '../../../api-client';
import { transformMoviesData } from '../utils/transform-movie-data';

export async function fetchPopularMovies() {
  const { data } = await moviesAxios.get(`/movie/popular?region=AU`);

  return transformMoviesData(data);
}

export function usePopularMovies({ popular } = {}) {
  return useQuery(['popular'], fetchPopularMovies, {
    initialData: popular
  });
}

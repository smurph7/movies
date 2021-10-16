import { useQuery } from 'react-query';

import { moviesAxios } from '../../../api-client';
import { transformMoviesData } from '../utils/transform-movie-data';

export async function fetchPopularMovies() {
  const { data } = await moviesAxios.get(`/movie/popular?region=AU`);

  return data;
}

export function usePopularMovies() {
  return useQuery(['popular'], fetchPopularMovies, {
    select: data => transformMoviesData(data)
  });
}

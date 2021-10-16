import { useQuery } from 'react-query';

import { moviesAxios } from '../../../api-client';
import { transformMoviesData } from '../utils/transform-movie-data';

export async function fetchUpcomingMovies() {
  const { data } = await moviesAxios.get(`/movie/upcoming?region=AU`);

  return data;
}

export function useUpcomingMovies() {
  return useQuery(['upcoming'], fetchUpcomingMovies, {
    select: data => transformMoviesData(data)
  });
}

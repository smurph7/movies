import { useQuery } from 'react-query';

import { moviesAxios } from '../../../api-client';
import { transformMoviesData } from '../utils/transform-movie-data';

export async function fetchNowPlayingMovies() {
  const { data } = await moviesAxios.get(`/movie/now_playing?region=AU`);
  return data;
}

export function useNowPlayingMovies() {
  return useQuery(['nowPlaying'], fetchNowPlayingMovies, {
    select: data => transformMoviesData(data)
  });
}

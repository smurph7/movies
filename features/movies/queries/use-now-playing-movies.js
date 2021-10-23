import { useQuery } from 'react-query';

import { moviesAxios } from '../../../api-client';
import { transformMoviesData } from '../utils/transform-movie-data';

export async function fetchNowPlayingMovies() {
  const { data } = await moviesAxios.get(`/movie/now_playing?region=AU`);
  return transformMoviesData(data);
}

export function useNowPlayingMovies({ nowPlaying } = {}) {
  return useQuery(['nowPlaying'], fetchNowPlayingMovies, {
    initialData: nowPlaying
  });
}

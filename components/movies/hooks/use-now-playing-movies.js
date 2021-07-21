import { useQuery } from 'react-query';
import axios from 'axios';

import { transformMovieData } from './transform-movie-data';

export async function fetchNowPlayingMovies() {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&region=AU`
  );
  return data;
}

export function useNowPlayingMovies() {
  return useQuery(['nowPlaying'], fetchNowPlayingMovies, {
    select: data => transformMovieData(data)
  });
}

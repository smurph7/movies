import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

function transformMovieData(data) {
  return {
    id: data.id,
    title: data.title,
    posterPath: data.poster_path,
    voteAverage: data.vote_average,
    overview: data.overview,
    watchProviders: data['watch/providers'].results.AU
  };
}

export async function fetchMovie({ queryKey }) {
  const [, { id }] = queryKey;
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=watch/providers`
  );
  return data;
}

export function useMovie({ id }) {
  return useQuery(['movie', { id }], fetchMovie, {
    enabled: !!id,
    select: data => transformMovieData(data)
  });
}

export function usePrefetchMovie() {
  const queryClient = useQueryClient();

  async function handlePrefetch({ id }) {
    await queryClient.prefetchQuery(['movie', { id }], fetchMovie, {
      staleTime: 5 * 60 * 1000 // 5 minutes
    });
  }
  return { handlePrefetch };
}

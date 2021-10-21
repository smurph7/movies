import { useQuery } from 'react-query';

import { moviesAxios } from '../../../api-client';

function transformReviewData(data) {
  return {
    ...data,
    results: data?.results?.map(result => ({
      author: result?.author,
      authorDetails: {
        name: result?.author_details?.name,
        username: result?.author_details?.username,
        avatarPath: result?.author_details?.avatar_path,
        rating: result?.author_details?.rating
      },
      content: result?.content,
      createdAt: result?.created_at,
      id: result?.id,
      updatedAt: result?.updated_at,
      url: result?.url
    }))
  };
}

export async function fetchMovieReviews({ queryKey }) {
  const [, { id }] = queryKey;

  const { data } = await moviesAxios.get(`/movie/${id}/reviews`);

  return data;
}

export function useMovieReviews({ id }) {
  return useQuery(['reviews', { id }], fetchMovieReviews, {
    enabled: !!id,
    select: data => transformReviewData(data)
  });
}

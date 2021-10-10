import { useQuery } from 'react-query';
import axios from 'axios';

function transformReleaseDates(data) {
  const RELEASE_REGION = 'AU';
  if (!data) {
    return;
  }

  return data?.results
    ?.filter(result => result.iso_3166_1 === RELEASE_REGION)[0]
    ?.release_dates.map(result => ({
      certification: result.certification,
      releaseDate: result.release_date,
      region: RELEASE_REGION
    }))[0];
}

export async function fetchReleaseDates({ queryKey }) {
  const [, { id }] = queryKey;
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${id}/release_dates?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );
  return data;
}

export function useReleaseDates({ id }) {
  return useQuery(['releaseDates', { id }], fetchReleaseDates, {
    enabled: !!id,
    select: data => transformReleaseDates(data)
  });
}

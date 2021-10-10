import { useQuery } from 'react-query';
import axios from 'axios';

function transformReleaseDates(data) {
  const RELEASE_REGION = 'AU';
  const FALLBACK_RELEASE_REGION = 'US';
  if (!data) {
    return;
  }

  const regionResults = data?.results?.filter(
    result => result.iso_3166_1 === RELEASE_REGION
  )[0];

  const fallbackRegionResults = data?.results?.filter(
    result => result.iso_3166_1 === FALLBACK_RELEASE_REGION
  )[0];

  const regionData = regionResults?.release_dates.map(result => ({
    certification: result.certification,
    releaseDate: result.release_date
  }))[0];

  const fallbackRegionData = fallbackRegionResults?.release_dates.map(
    result => ({
      certification: result.certification,
      releaseDate: result.release_date
    })
  )[0];

  return {
    certification:
      regionData.certification !== ''
        ? regionData.certification
        : fallbackRegionData.certification,
    releaseDate:
      regionData.release_date !== ''
        ? regionData.releaseDate
        : fallbackRegionData.releaseDate,
    region:
      regionData.releaseDate !== '' ? RELEASE_REGION : FALLBACK_RELEASE_REGION
  };
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

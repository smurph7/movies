function transformProvider(provider) {
  if (!provider) {
    return;
  }
  return {
    providerId: provider.provider_id,
    providerName: provider.provider_name,
    logoPath: provider.logo_path,
    displayPriority: provider.display_priority
  };
}

export function transformWatchProviders(watchProviders) {
  if (!watchProviders) {
    return;
  }
  return {
    link: watchProviders.link,
    buy:
      watchProviders?.buy?.map(provider => transformProvider(provider)) ?? [],
    flatrate:
      watchProviders?.flatrate?.map(provider => transformProvider(provider)) ??
      [],
    rent:
      watchProviders?.rent?.map(provider => transformProvider(provider)) ?? []
  };
}

function transformTrailerData(data) {
  const trailers = data?.results.filter(
    result =>
      result?.type?.toLowerCase() === 'trailer' &&
      result?.site?.toLowerCase() === 'youtube'
  );
  return trailers.map(trailer => ({
    ...trailer,
    publishedAt: trailer.published_at
  }));
}

export function transformMoviesData(data) {
  return {
    ...data,
    totalPages: data?.total_pages,
    totalResults: data?.total_results,
    results: data?.results
      ?.map(result => {
        if (!result) {
          return;
        }
        return {
          id: result.id,
          title: result.title,
          posterPath: result.poster_path,
          voteAverage: result.vote_average,
          releaseYear: result.release_date?.split('-')[0]
        };
      })
      .filter(result => result !== undefined)
  };
}

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
    releaseDate: result.release_date,
    region: regionResults.iso_3166_1
  }))[0];

  const fallbackRegionData = fallbackRegionResults?.release_dates.map(
    result => ({
      certification: result.certification,
      releaseDate: result.release_date,
      region: fallbackRegionResults.iso_3166_1
    })
  )[0];

  return {
    certification:
      regionData?.certification !== ''
        ? regionData?.certification
        : fallbackRegionData?.certification ?? null,
    releaseDate:
      regionData?.releaseDate && regionData?.releaseDate !== ''
        ? regionData?.releaseDate
        : fallbackRegionData?.releaseDate ?? null,
    region:
      regionData?.releaseDate && regionData?.releaseDate !== ''
        ? regionData?.region
        : fallbackRegionData?.region ?? null
  };
}

function transformCreditsData(data) {
  return data.cast
    .sort(castMember => castMember.order)
    .slice(0, 10)
    .map(castMember => ({
      id: 10859,
      name: castMember.name,
      profilePath: castMember.profile_path,
      castId: castMember.cast_id,
      character: castMember.character,
      creditId: castMember.credit_id,
      order: castMember.order
    }));
}

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

function getHoursAndMinutes(timeInMinutes) {
  const num = timeInMinutes * 1;
  if (typeof num === 'number' && num !== 0) {
    const hours = num / 60;
    const convertedHours = Math.floor(hours);
    const minutes = (hours - convertedHours) * 60;
    const convertedMinutes = Math.round(minutes);
    if (convertedHours) {
      return `${convertedHours}h ${
        convertedMinutes !== 0 ? `${convertedMinutes}m` : ''
      }`;
    }
    return `${convertedMinutes}m`;
  }
  return null;
}

export function transformMovieData(data) {
  return {
    id: data.id,
    title: data.title,
    backdropPath: data.backdrop_path,
    posterPath: data.poster_path,
    voteAverage: data.vote_average,
    overview: data.overview,
    releaseYear: data.release_date.split('-')[0],
    tagline: data.tagline,
    genres: data.genres,
    runtime: getHoursAndMinutes(data.runtime),
    revenue: data.revenue,
    status: data.status,
    budget: data.budget,
    watchProviders:
      transformWatchProviders(data['watch/providers']?.results?.AU) ?? null,
    trailers: transformTrailerData(data?.videos) ?? null,
    releaseDates: transformReleaseDates(data?.release_dates),
    cast: transformCreditsData(data?.credits),
    reviews: transformReviewData(data?.reviews)
  };
}

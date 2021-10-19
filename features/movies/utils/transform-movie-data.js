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

export function transformMoviesData(data) {
  return {
    ...data,
    results: data.results.map(result => ({
      id: result.id,
      title: result.title,
      posterPath: result.poster_path,
      voteAverage: result.vote_average,
      releaseYear: result.release_date.split('-')[0]
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
    budget: data.budget
  };
}

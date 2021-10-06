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

export function transformMovieData(data) {
  return {
    id: data.id,
    title: data.title,
    posterPath: data.poster_path,
    voteAverage: data.vote_average,
    overview: data.overview,
    watchProviders: data['watch/providers'].results.AU
  };
}

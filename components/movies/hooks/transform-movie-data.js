export function transformMovieData(data) {
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

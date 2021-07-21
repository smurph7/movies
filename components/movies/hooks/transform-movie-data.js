export function transformMovieData(data) {
  return {
    ...data,
    results: data.results.map(result => ({
      id: result.id,
      title: result.original_title,
      posterPath: result.poster_path,
      voteAverage: result.vote_average
    }))
  };
}
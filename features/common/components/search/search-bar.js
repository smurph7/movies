import * as React from 'react';
import Select from 'react-select';
import { useDebounce } from 'use-debounce';

import { Box } from '~/features/ui';
import { useSearchMovies } from '~/features/movies/queries/use-search-movies';

export function SearchBar() {
  const [query, setQuery] = React.useState();
  const [debouncedQuery] = useDebounce(query, 250);
  const searchMoviesQuery = useSearchMovies({ query: debouncedQuery });
  const results = searchMoviesQuery.data?.results.map(result => ({
    ...result,
    label: result.title
  }));

  function handleInputChange(newValue) {
    setQuery(newValue);
  }

  return (
    <Box css={{ width: '100%' }}>
      <Select
        options={results}
        onInputChange={handleInputChange}
        inputValue={query}
      />
    </Box>
  );
}

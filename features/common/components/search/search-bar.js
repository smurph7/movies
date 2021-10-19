import * as React from 'react';
import Select, { components } from 'react-select';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import NextImage from 'next/image';
import { useDebounce } from 'use-debounce';

import { Box, Text, Flex } from '~/features/ui';
import { usePrefetchMovie, useSearchMovies } from '~/features/movies/queries';
import { IMAGE_BASE_URL } from '~/utils/config';
import { getUrlFromString } from '~/utils/get-url-from-string';

export function SearchBar() {
  const router = useRouter();
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

  function handlePressEnter(e) {
    e.stopPropagation();
    if (e.key === 'Enter') {
      router.push(`/search?q=${debouncedQuery}`);
    }
  }

  function CustomOption(props) {
    const { innerProps, innerRef, data: movie, isFocused } = props;
    const href = `/movie/${getUrlFromString(movie?.title)}-${movie?.id}`;
    const { handlePrefetch } = usePrefetchMovie();

    function handlePrefetchMovie() {
      handlePrefetch({ id: `${movie.id}` });
    }

    if (isFocused) {
      handlePrefetchMovie();
    }

    return (
      <NextLink href={href}>
        <Box {...innerProps} ref={innerRef}>
          <components.Option {...props}>
            <Flex align="center" gap={3}>
              <NextImage
                className="rounded"
                src={
                  movie?.posterPath
                    ? `${IMAGE_BASE_URL}w92${movie.posterPath}`
                    : '/movie-poster-placeholder.svg'
                }
                alt={movie.title}
                height={60}
                width={40}
              />
              <Text fontSize={2}>
                {movie.title} ({movie.releaseYear})
              </Text>
            </Flex>
          </components.Option>
        </Box>
      </NextLink>
    );
  }

  const customStyles = {
    option: (styles, { isFocused }) => ({
      ...styles,
      fontSize: '17px',
      fontFamily: 'Inter, sans-serif',
      cursor: 'pointer',
      backgroundColor: isFocused ? '#e1e1e1' : 'white',
      ':hover': {
        ...styles[':hover'],
        backgroundColor: isFocused && 'white'
      },
      ':active': {
        ...styles[':active'],
        backgroundColor: isFocused && 'white'
      }
    }),
    control: provided => ({
      ...provided,
      fontFamily: 'Inter, sans-serif',
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10,
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
      border: 'none',
      height: '40px',
      fontSize: '17px'
    }),
    menu: provided => ({
      ...provided,
      marginTop: 0,
      zIndex: 11,
      fontFamily: 'Inter, sans-serif'
    })
  };

  return (
    <Box css={{ width: '100%' }}>
      <Select
        options={results}
        onInputChange={handleInputChange}
        inputValue={query}
        styles={customStyles}
        components={{
          Option: CustomOption
        }}
        onKeyDown={handlePressEnter}
      />
    </Box>
  );
}

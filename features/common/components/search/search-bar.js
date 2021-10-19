import * as React from 'react';
import Select, { components } from 'react-select';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import NextImage from 'next/image';
import { useDebounce } from 'use-debounce';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { sage, sageDark } from '@radix-ui/colors';

import { Box, Text, Flex } from '~/features/ui';
import { usePrefetchMovie, useSearchMovies } from '~/features/movies/queries';
import { IMAGE_BASE_URL } from '~/utils/config';
import { getUrlFromString } from '~/utils/get-url-from-string';
import { useThemeChange } from '~/features/ui/theme-change-button/hooks';

export function SearchBar() {
  const router = useRouter();
  let color = sageDark;
  const { themeText } = useThemeChange();
  const [query, setQuery] = React.useState();
  const [debouncedQuery] = useDebounce(query, 250);
  const searchMoviesQuery = useSearchMovies({ query: debouncedQuery });
  const results = searchMoviesQuery.data?.results.map(result => ({
    ...result,
    label: result.title
  }));

  if (themeText === 'theme-default') {
    color = sage;
  }

  function handleInputChange(newValue) {
    setQuery(newValue);
  }

  function handlePressEnter(e) {
    // e.stopPropagation();
    // if (e.key === 'Enter') {
    //   router.push(`/search?q=${debouncedQuery}`);
    // }
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
        <Box css={{ width: '100%' }} {...innerProps} ref={innerRef}>
          <components.Option {...props}>
            <Flex align="center" gap={3}>
              <NextImage
                className="search-rounded"
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

  function CustomDropDownIndicator(props) {
    const { innerProps, innerRef } = props;
    return (
      <Flex
        css={{ p: '$2', color: '$sage10', '&:hover': { color: '$sage11' } }}
        {...innerProps}
        ref={innerRef}
      >
        <MagnifyingGlassIcon style={{ width: 20, height: 20 }} />
      </Flex>
    );
  }

  const customStyles = {
    option: (styles, { isFocused }) => ({
      ...styles,
      fontSize: '17px',
      fontFamily: 'Inter, sans-serif',
      cursor: 'pointer',
      backgroundColor: isFocused ? color.sage7 : color.sage3,
      ':hover': {
        ...styles[':hover'],
        backgroundColor: isFocused && color.sage7
      },
      ':active': {
        ...styles[':active'],
        backgroundColor: isFocused && color.sage7
      }
    }),
    control: provided => ({
      ...provided,
      fontFamily: 'Inter, sans-serif',
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderTopRightRadius: 10,
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
          DropdownIndicator: CustomDropDownIndicator,
          Option: CustomOption
        }}
        onKeyDown={handlePressEnter}
        placeholder="Search"
      />
    </Box>
  );
}

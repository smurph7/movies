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
import { useThemeStore } from '~/features/ui/theme-change-button/use-theme-store';

export function SearchBar() {
  const router = useRouter();
  const selectRef = React.useRef();
  const [color, setColor] = React.useState(sage);
  const [query, setQuery] = React.useState();
  const theme = useThemeStore(state => state.theme);
  const [debouncedQuery] = useDebounce(query, 250);
  const searchMoviesQuery = useSearchMovies({ query: debouncedQuery });
  const results = searchMoviesQuery.data?.results.map(result => ({
    ...result,
    label: result.title
  }));

  React.useEffect(() => {
    if (theme === 'theme-default') {
      setColor(sage);
    } else {
      setColor(sageDark);
    }
  }, [theme]);

  function handleInputChange(newValue) {
    setQuery(newValue);
  }

  function handleKeyDown(input) {
    const { focusedOption } = selectRef.current.state;
    if (input.code === 'Enter' && focusedOption) {
      router.push(
        `/movie/${getUrlFromString(focusedOption?.title)}-${focusedOption?.id}`
      );
    }
  }

  function handleClearValue() {
    selectRef.current.clearValue();
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
      fontSize: '17px',
      backgroundColor: color.sage3
    }),
    menu: provided => ({
      ...provided,
      marginTop: 0,
      zIndex: 11,
      fontFamily: 'Inter, sans-serif',
      backgroundColor: color.sage3
    }),
    input: provided => ({
      ...provided,
      color: color.sage12
    }),
    placeholder: provided => ({
      ...provided,
      color: color.sage10
    })
  };

  return (
    <Box css={{ width: '100%' }}>
      <Select
        ref={selectRef}
        options={results}
        onInputChange={handleInputChange}
        inputValue={query}
        styles={customStyles}
        components={{
          DropdownIndicator: CustomDropDownIndicator,
          Option: CustomOption
        }}
        placeholder="Search"
        onKeyDown={handleKeyDown}
        onFocus={handleClearValue}
        isClearable
      />
    </Box>
  );
}

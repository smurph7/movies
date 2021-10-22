import * as React from 'react';
import Select, { components } from 'react-select';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import NextImage from 'next/image';
import { useDebounce } from 'use-debounce';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import {
  sage as sageLight,
  sageDark,
  green as greenLight,
  greenDark
} from '@radix-ui/colors';

import { Box, Text, Flex } from '~/features/ui';
import { usePrefetchMovie, useSearchMovies } from '~/features/movies/queries';
import { useThemeStore } from '~/features/ui/theme-change-button/use-theme-store';
import { IMAGE_BASE_URL } from '~/utils/config';
import { getUrlFromString } from '~/utils/get-url-from-string';
import { useBreakpoint } from '~/utils/use-breakpoint';

export function SearchBar() {
  const router = useRouter();
  const selectRef = React.useRef();
  const { boolean: isMobile } = useBreakpoint('bp3');
  const [sage, setSage] = React.useState(sageLight);
  const [green, setGreen] = React.useState(greenLight);
  const [query, setQuery] = React.useState();
  const theme = useThemeStore(state => state.theme);
  const [debouncedQuery] = useDebounce(query, 250);
  const searchMoviesQuery = useSearchMovies({ query: debouncedQuery });
  const results = searchMoviesQuery.data?.results.map(result => ({
    ...result,
    label: result.title
  }));

  React.useEffect(() => {
    if (isMobile) {
      selectRef.current.focus();
    }
  }, [isMobile]);

  React.useEffect(() => {
    if (theme === 'theme-default') {
      setSage(sageLight);
      setGreen(greenLight);
    } else {
      setSage(sageDark);
      setGreen(greenDark);
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
                {movie.title} {movie.releaseYear && `(${movie.releaseYear})`}
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
      backgroundColor: isFocused ? green.green7 : sage.sage3,
      ':hover': {
        ...styles[':hover'],
        backgroundColor: isFocused && green.green7
      },
      ':active': {
        ...styles[':active'],
        backgroundColor: isFocused && green.green7
      }
    }),
    control: (provided, state) => ({
      ...provided,
      fontFamily: 'Inter, sans-serif',
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderTopRightRadius: 10,
      height: '40px',
      fontSize: '17px',
      backgroundColor: sage.sage3,
      boxShadow: state.isFocused ? 0 : 0,
      borderColor: state.isFocused ? green.green8 : sage.sage7,
      '&:hover': {
        borderColor: state.isFocused ? green.green8 : sage.sage7
      }
    }),
    menu: provided => ({
      ...provided,
      marginTop: 0,
      zIndex: 11,
      fontFamily: 'Inter, sans-serif',
      backgroundColor: sage.sage3
    }),
    input: provided => ({
      ...provided,
      color: sage.sage12,
      border: 'none'
    }),
    placeholder: provided => ({
      ...provided,
      color: sage.sage10
    }),
    indicatorSeparator: provided => ({
      ...provided,
      backgroundColor: sage.sage8
    })
  };

  return (
    <Box
      css={{
        '@bp1': { width: '100%' },
        '@bp3': { width: '75%' }
      }}
    >
      <Select
        aria-label="search"
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

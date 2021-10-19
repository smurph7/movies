import * as React from 'react';
import NextImage from 'next/image';

import { Text, Flex, Button } from '~/features/ui';
import { useMovieWatchProviders } from '~/features/movies/queries';
import { IMAGE_BASE_URL } from '~/utils/config';

export function WatchProviderButton({ id }) {
  const { data: watchProviders } = useMovieWatchProviders({ id });

  if (!watchProviders) {
    return null;
  }

  const allProviders = [...watchProviders?.flatrate, ...watchProviders?.buy];

  const providerToDisplay = allProviders.reduce((prev, current) =>
    prev.displayPriority < current.displayPriority ? prev : current
  );

  return (
    // alert before new page with warning
    // <a href={watchProviders?.link} target="_blank" rel="noreferrer">
    <Button
      variant="reset"
      aria-label="watch-providers"
      css={{
        width: '100%',
        height: '100%',
        bg: '$sage3',
        p: '$3',
        borderBottomLeftRadius: '$4',
        borderBottomRightRadius: '$4',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
      }}
    >
      <Flex align="center" justify="center" gap={0}>
        <NextImage
          className="rounded"
          src={`${IMAGE_BASE_URL}w92${providerToDisplay.logoPath}`}
          alt={`${providerToDisplay.providerName}-logo`}
          width={60}
          height={60}
        />
        <Flex
          direction="column"
          gap={1}
          css={{ width: '100%', textAlign: 'center' }}
        >
          <Text color="contrast" fontSize={2}>
            Available on
          </Text>
          <Text color="contrast" fontWeight="$bold">
            {providerToDisplay.providerName}
          </Text>
        </Flex>
      </Flex>
    </Button>
  );
}

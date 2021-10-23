import * as React from 'react';
import NextImage from 'next/image';

import { Text, Flex, Button } from '~/features/ui';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose
} from '~/features/ui/dialog';
import { IMAGE_BASE_URL } from '~/utils/config';

export function WatchProviderButton({ watchProviders }) {
  if (!watchProviders) {
    return null;
  }

  const allProviders = [...watchProviders?.flatrate, ...watchProviders?.buy];

  const providerToDisplay = allProviders.reduce((prev, current) =>
    prev.displayPriority < current.displayPriority ? prev : current
  );

  function handleContinue() {
    window.open(watchProviders?.link, '_blank', 'noreferrer');
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
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
      </DialogTrigger>
      <DialogContent
        css={{
          p: '$6',
          pt: '$8'
        }}
      >
        <Flex direction="column" align="center" gap={6}>
          <Text css={{ lineHeight: 1.5 }}>
            You will be redirected to TMDB to view providers where this movie is
            available to watch.
          </Text>
          <Flex gap={3}>
            <DialogClose asChild>
              <Button css={{ fontSize: '$3', p: '$4' }}>Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant="green"
                css={{ fontSize: '$3', p: '$4' }}
                onClick={handleContinue}
              >
                Continue
              </Button>
            </DialogClose>
          </Flex>
        </Flex>
      </DialogContent>
    </Dialog>
  );
}

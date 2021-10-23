import * as React from 'react';
import { PlayIcon } from '@radix-ui/react-icons';

import { Box, Flex, Button } from '~/features/ui';
import { Dialog, DialogContent, DialogTrigger } from '~/features/ui/dialog';
import { useTrailers } from '~/features/movies/queries';

export function Trailer({ id }) {
  const { data: trailers } = useTrailers({ id });

  if (trailers?.length === 0) {
    return null;
  }

  const trailerToDisplay = trailers?.reduce((prev, current) =>
    new Date(prev?.publishedAt) > new Date(current?.publishedAt)
      ? prev
      : current
  );

  return (
    <Flex>
      <Dialog>
        <DialogTrigger asChild>
          <Button aria-label="play-trailer">
            <Flex gap={2} align="center">
              <PlayIcon /> Trailer
            </Flex>
          </Button>
        </DialogTrigger>
        <DialogContent
          onCloseAutoFocus={e => e.preventDefault()}
          css={{
            p: '$6',
            bg: '$sage3',
            borderRadius: '$2'
          }}
        >
          <Box
            css={{
              '@bp1': { width: 272, height: 153 },
              '@bp2': { width: 480, height: 270 },
              '@bp3': { width: 560, height: 315 },
              '@bp4': { width: 752, height: 423 }
            }}
          >
            <iframe
              title="Youtube Trailer"
              width="100%"
              height="100%"
              src={`https://www.youtube-nocookie.com/embed/${trailerToDisplay?.key}`}
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Flex>
  );
}

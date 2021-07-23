import * as React from 'react';
import NextImage from 'next/image';

import { Box, Card, Button } from '~/components/ui';

export function MovieCard({ movie, isLoading }) {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  return (
    <Button css={{ width: 'inherit', height: 'inherit', p: 0 }}>
      <Card bounceOnHover>
        <Box css={{ position: 'relative', width: '100%', height: '100%' }}>
          {isLoading ? (
            // TODO loading placeholder
            <Box />
          ) : (
            <NextImage
              src={`${imageBaseUrl}${movie.posterPath}`}
              alt={movie.title}
              layout="fill"
              priority
            />
          )}
        </Box>
      </Card>
    </Button>
  );
}

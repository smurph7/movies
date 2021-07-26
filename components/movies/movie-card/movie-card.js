import * as React from 'react';
import NextImage from 'next/image';

import { Box, Card, Link, Placeholder } from '~/components/ui';

export function MovieCard({ movie, isLoading }) {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  if (isLoading) {
    return (
      <Card>
        <Placeholder width="100%" height="100%" />
      </Card>
    );
  }

  return (
    <Link href="/">
      <Card bounceOnHover>
        <Box css={{ position: 'relative', width: '100%', height: '100%' }}>
          <NextImage
            src={`${imageBaseUrl}${movie.posterPath}`}
            alt={movie.title}
            layout="fill"
            priority
          />
        </Box>
      </Card>
    </Link>
  );
}

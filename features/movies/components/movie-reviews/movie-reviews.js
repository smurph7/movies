import * as React from 'react';
import { StarIcon } from '@radix-ui/react-icons';

import { Flex, Text, FloatingCard } from '~/features/ui';
import { useMovieReviews } from '~/features/movies/queries';

function ReviewCard({ review }) {
  function Header() {
    const createdDate = new Intl.DateTimeFormat('en-AU').format(
      new Date(review?.createdAt)
    );
    return (
      <Flex direction="column" gap={2}>
        <Flex align="center" gap={2}>
          <Text heading css={{ fontSize: '$3' }}>
            A review by {review?.author}
          </Text>
          <Flex
            align="center"
            gap={1}
            css={{
              bg: '$hiContrast',
              borderRadius: '$2',
              px: '$2',
              py: '$1',
              color: '$loContrast'
            }}
          >
            <StarIcon style={{ width: 18, height: 18 }} />
            <Text fontSize={1} color="loContrast">
              {review?.authorDetails?.rating}
            </Text>
          </Flex>
        </Flex>
        <Text fontSize={1}>
          Written by {review?.author} on {createdDate}
        </Text>
      </Flex>
    );
  }

  return (
    <FloatingCard header={<Header />}>
      <Flex>
        <Text css={{ lineHeight: 1.4 }}>{review.content}</Text>
      </Flex>
    </FloatingCard>
  );
}

export function MovieReviews({ id }) {
  const reviewsQuery = useMovieReviews({ id });
  console.log('reviewsQuery', reviewsQuery);
  if (!reviewsQuery.data) {
    return null;
  }

  return (
    <Flex direction="column" gap={2}>
      <Text heading>Reviews</Text>
      <Flex direction="column" gap={3}>
        {reviewsQuery.data?.results?.map(review => (
          <ReviewCard review={review} />
        ))}
      </Flex>
    </Flex>
  );
}

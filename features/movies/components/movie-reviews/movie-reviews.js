import * as React from 'react';
import { StarIcon } from '@radix-ui/react-icons';

import { Flex, Text, FloatingCard, Button } from '~/features/ui';
import { useMovieReviews } from '~/features/movies/queries';

function ReviewCard({ review }) {
  const ref = React.useRef();
  const [isTruncated, setTruncated] = React.useState(true);
  const [isOverflown, setOverflown] = React.useState();

  React.useEffect(() => {
    const { clientWidth, clientHeight, scrollWidth, scrollHeight } =
      ref?.current ?? {};
    setOverflown(scrollHeight > clientHeight || scrollWidth > clientWidth);
  }, [ref]);

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
      <Flex direction="column">
        <Text
          ref={ref}
          css={{
            lineHeight: 1.4,
            whiteSpace: 'normal',
            display: '-webkit-box !important',
            ' -webkit-line-clamp': isTruncated ? 3 : 'inherit',
            '-webkit-box-orient': 'vertical',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
          }}
        >
          {review.content}
        </Text>
        {isOverflown && (
          <Button
            css={{ alignSelf: 'flex-end', color: '$sage11' }}
            ghost
            onClick={() => setTruncated(!isTruncated)}
          >
            View {isTruncated ? 'more' : 'less'}
          </Button>
        )}
      </Flex>
    </FloatingCard>
  );
}

export function MovieReviews({ id }) {
  const reviewsQuery = useMovieReviews({ id });

  if (!reviewsQuery.data?.results?.length > 0) {
    return null;
  }

  return (
    <Flex direction="column" gap={4}>
      <Text heading>Reviews</Text>
      <Flex direction="column" gap={3}>
        {reviewsQuery.data?.results?.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </Flex>
    </Flex>
  );
}

import * as React from 'react';
import { useRouter } from 'next/router';

import { Layout } from '~/components/common';
import { Text } from '~/components/ui';
import { useMovie } from '~/components/movies/hooks';

export default function Movie() {
  const router = useRouter();
  const { slug } = router.query;

  const splitSlug = slug?.split('-');
  const id = splitSlug ? splitSlug[splitSlug?.length - 1] : undefined;

  const movieQuery = useMovie({ id });

  return (
    <Layout>
      <Text>{movieQuery.data?.title}</Text>
    </Layout>
  );
}

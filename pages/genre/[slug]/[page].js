import * as React from 'react';
import { useRouter } from 'next/router';

import { Layout } from '~/features/common/components';
import { useGenre } from '~/features/movies/queries';

export default function Genre() {
  const router = useRouter();
  const { slug, page } = router.query;

  const splitSlug = slug?.split('-');
  const id = splitSlug ? splitSlug[splitSlug?.length - 1] : undefined;

  const genreQuery = useGenre({ id, page });
  const isLoading = genreQuery.isLoading || genreQuery.isIdle;

  return <Layout>hello</Layout>;
}

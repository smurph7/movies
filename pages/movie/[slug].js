import * as React from 'react';
import { useRouter } from 'next/router';

import { Layout } from '~/components/common';

export default function Movie() {
  const router = useRouter();
  const { slug } = router.query;
  return <Layout>{slug}</Layout>;
}

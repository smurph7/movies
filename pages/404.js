import * as React from 'react';

import { Layout, ErrorMessageView } from '~/features/common/components';

export default function Custom404Page() {
  return (
    <Layout>
      <ErrorMessageView />
    </Layout>
  );
}

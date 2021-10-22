import * as React from 'react';

import {
  Layout,
  ErrorMessageView,
  Metadata
} from '~/features/common/components';

export default function Custom404Page() {
  return (
    <>
      <Metadata
        title="Not found"
        description={`Sorry, we couldn't find what you were looking for.`}
      />
      <Layout>
        <ErrorMessageView />
      </Layout>
    </>
  );
}

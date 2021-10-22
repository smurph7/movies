import * as React from 'react';
import Head from 'next/head';

export function Metadata({ title, description }) {
  return (
    <Head>
      <title>Movies | {title}</title>
      <meta name="description" content={description} />
    </Head>
  );
}

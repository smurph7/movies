import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

import { getCssText } from '../stitches.config';

import { mediaStyles } from '~/styles/media';

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    try {
      const initialProps = await NextDocument.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            <style
              id="stitches"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: getCssText() }}
            />
            <style
              type="text/css"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: mediaStyles }}
            />
          </>
        )
      };
      // eslint-disable-next-line no-empty
    } finally {
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/logo-icon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

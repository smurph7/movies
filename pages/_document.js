import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

import { getCssString } from '../stitches.config';

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
              dangerouslySetInnerHTML={{ __html: getCssString() }}
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
          <link
            rel="preload"
            href="/fonts/subset-NunitoSans-BoldItalic.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/subset-NunitoSans-Bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/subset-NunitoSans-Italic.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/subset-NunitoSans-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>
        <body style={{ margin: ' 0px' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// @flow
import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: Object) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html lang="id">
        <Head>
          <meta charSet="utf-8" />
          <meta
            content="initial-scale=1.0, width=device-width"
            name="viewport"
          />
          <link href="../static/favicon.ico" rel="icon" type="image/x-icon" />
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

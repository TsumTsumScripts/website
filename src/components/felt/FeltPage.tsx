import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import '@site/src/css/felt.css';

/** The Docusaurus layout with the felt ground behind it. */
export default function FeltPage({
  title,
  description,
  wide,
  children,
}: {
  title?: string;
  description: string;
  wide?: boolean;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <Layout title={title} description={description}>
      <Head>
        <meta name="darkreader-lock" />
        <body className="felt-body" />
      </Head>
      <div className="felt">
        <div className={wide ? 'felt-wrap felt-wrap--wide' : 'felt-wrap'}>{children}</div>
      </div>
    </Layout>
  );
}

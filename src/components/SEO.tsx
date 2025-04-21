import React from 'react';
import { NextSeo } from 'next-seo';
import Head from 'next/head';

type SEOProps = {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
};

const SEO = ({ 
  title, 
  description, 
  canonical, 
  ogImage = 'https://tempsite.com/images/og-image.jpg',
  noindex = false 
}: SEOProps) => {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          title,
          description,
          url: canonical,
          images: [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        }}
        noindex={noindex}
      />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Add structured data for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Fitness & Health Hub',
              url: 'https://tempsite.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://tempsite.com/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </Head>
    </>
  );
};

export default SEO;

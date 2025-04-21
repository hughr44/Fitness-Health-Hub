import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  titleTemplate: '%s | Fitness & Health Hub',
  defaultTitle: 'Fitness & Health Hub - Expert Advice, Tools & Resources',
  description: 'Your ultimate resource for fitness advice, health tools, and workout guidance. Calculate your TDEE, estimate body fat, and generate personalized workout splits.',
  canonical: 'https://tempsite.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tempsite.com',
    siteName: 'Fitness & Health Hub',
    title: 'Fitness & Health Hub - Expert Advice, Tools & Resources',
    description: 'Your ultimate resource for fitness advice, health tools, and workout guidance. Calculate your TDEE, estimate body fat, and generate personalized workout splits.',
    images: [
      {
        url: 'https://tempsite.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Fitness & Health Hub',
      },
    ],
  },
  twitter: {
    handle: '@fitnesshealth',
    site: '@fitnesshealth',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'fitness, health, workout, TDEE calculator, body fat estimator, workout split, exercise, nutrition, weight loss, muscle gain',
    },
  ],
};

export default config;

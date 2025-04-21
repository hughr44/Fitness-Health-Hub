/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://fitness-health-hub.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/404'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://fitness-health-hub.vercel.app/server-sitemap.xml',
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  outDir: './public',
};

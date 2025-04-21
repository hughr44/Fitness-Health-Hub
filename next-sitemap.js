/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://tempsite.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/404'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://tempsite.com/server-sitemap.xml',
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

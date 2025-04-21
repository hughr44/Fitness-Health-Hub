/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['tempsite.com'],
  },
  // Ensure we're using Static Site Generation
  output: 'export',
  // Disable image optimization during export
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

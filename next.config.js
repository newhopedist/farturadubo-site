/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['trae-api-us.mchost.guru', 'source.unsplash.com', 'images.unsplash.com'],
    remotePatterns: [
      { protocol: 'https', hostname: 'source.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['pt-BR'],
    defaultLocale: 'pt-BR',
  },
}

module.exports = nextConfig

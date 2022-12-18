/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ['graphql', 'providers', 'prisma', 'e2e'],
  },
}

module.exports = nextConfig

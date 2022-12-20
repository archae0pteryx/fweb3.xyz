/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ['graphql', 'providers', 'prisma', 'e2e', 'pages', 'components', 'hooks', 'utils', 'styles', 'types'],
  },
}

module.exports = nextConfig

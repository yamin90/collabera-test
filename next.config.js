/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig
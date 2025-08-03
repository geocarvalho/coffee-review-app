/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Ensure CSS is properly handled in static export
  assetPrefix: '',
  // Force cache busting for static assets
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
  // Disable server-side features for static export
  // Note: appDir is not needed in Next.js 14
}

module.exports = nextConfig 
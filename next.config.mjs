/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // This is the missing piece
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig

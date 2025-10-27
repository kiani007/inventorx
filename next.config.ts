import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // This will allow production builds to complete even if there are ESLint warnings
    // But will still show warnings during development
    ignoreDuringBuilds: false, // Keep as false to see warnings but not fail builds
  },
  typescript: {
    // Ensures TypeScript errors still block the build
    ignoreBuildErrors: false,
  },
  images: {
    // Configure for external images if needed
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;

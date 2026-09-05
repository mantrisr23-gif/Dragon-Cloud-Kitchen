import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This tells Vercel to deploy the site even if TypeScript complains
  typescript: {
    ignoreBuildErrors: true,
  },
  // This ignores strict linting rules during deployment
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
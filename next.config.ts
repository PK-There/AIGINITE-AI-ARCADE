import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove the "N" Next.js badge overlay in dev + deployed apps
  devIndicators: false,
  // Remove the "X-Powered-By: Next.js" response header
  poweredByHeader: false,
};

export default nextConfig;

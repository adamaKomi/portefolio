import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Allow the preview panel origin to access the dev server
  allowedDevOrigins: ["*.space-z.ai", "*.z.ai"],
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",
  images: { unoptimized: true },
  basePath: "/app_bootstrapper", // Ensures routing works correctly
  assetPrefix: "/app_bootstrapper/", // Ensures assets load properly
};

export default nextConfig;

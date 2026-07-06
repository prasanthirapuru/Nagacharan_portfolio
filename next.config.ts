import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mp4$/,
      loader: path.resolve("./media-loader.js"),
    });
    return config;
  },
};

export default nextConfig;

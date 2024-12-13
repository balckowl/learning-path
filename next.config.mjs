import path from "path";
import { fileURLToPath } from 'url';
/** @type {import('next').NextConfig} */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: "**", // 全てのホスト名を許可
        protocol: "https",
      },
      {
        hostname: "**", // 全てのホスト名を許可
        protocol: "http",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
  // output: "standalone",
  // productionBrowserSourceMaps:true,
  // reactStrictMode: true,
};

export default nextConfig;

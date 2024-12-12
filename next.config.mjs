/** @type {import('next').NextConfig} */
const nextConfig = {
    dangerouslyAllowSVG: true,
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                hostname: '**', // 全てのホスト名を許可
                protocol: 'https',
            },
            {
                hostname: '**', // 全てのホスト名を許可
                protocol: 'http',
            },
        ],
    },
    // output: "standalone",
    // productionBrowserSourceMaps:true,
    // reactStrictMode: true,
};

export default nextConfig;

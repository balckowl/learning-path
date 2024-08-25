/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
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
};

export default nextConfig;
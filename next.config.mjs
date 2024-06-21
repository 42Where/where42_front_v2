/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // async headers() {
  //   return [
  //     {
  //       source: '/v3/:path*',
  //       headers: [
  //         { key: 'Access-Control-Allow-Credentials', value: 'true' },
  //         {
  //           key: 'Access-Control-Allow-Origin',
  //           value: '*',
  //         },
  //         // 클라이언트 도메인으로 변경
  //         // 다른 필요한 헤더들 추가
  //       ],
  //     },
  //   ];
  // },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/v3/:path*',
  //       destination: `${process.env.NEXT_PUBLIC_DEV_API_URL}/v3/:path*`,
  //     },
  //   ];
  // },
};

export default nextConfig;

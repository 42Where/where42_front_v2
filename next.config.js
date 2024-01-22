/** @type {import('next').NextConfig} */
/** scss 를 위한 설정 */
const path = require("path");

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  // output: "standalone",
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["cdn.intra.42.fr", "images.pexels.com", "i.ibb.co"], // 이미지 호스트 추가
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async headers() {
    return [
      {
        source: "/v3/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          // 클라이언트 도메인으로 변경
          // 다른 필요한 헤더들 추가
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/v3/:path*",
        destination: `${process.env.NEXT_PUBLIC_DEV_API_URL}/v3/:path*`,
      },
    ];
  },
};

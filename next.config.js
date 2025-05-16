// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "daehandoryo.s3.ap-northeast-2.amazonaws.com", // ← 여기에 너의 S3 도메인
      },
    ],
  },
};

module.exports = nextConfig;

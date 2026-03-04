import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/blog/web",
        permanent: true,
      },
    ];
  },

  // https://ecommerce.routemisr.com/Route-Academy-products/1680403397402-cover.jpeg
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",

        pathname: "/*/**",
       
      },
    ],
  },
};

export default nextConfig;

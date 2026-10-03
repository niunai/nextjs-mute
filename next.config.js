module.exports = {
  assetPrefix: "/mute",
  async rewrites() {
    return [
      {
        source: "/mute/api/:path*",
        destination: "/api/:path*",
      },
      {
        source: "/mute/images/:query*",
        destination: "/_next/image/:query*",
      },
      {
        source: "/mute/_next/:path*",
        destination: "/_next/:path*",
      },
    ];
  },
  output: "standalone",
};

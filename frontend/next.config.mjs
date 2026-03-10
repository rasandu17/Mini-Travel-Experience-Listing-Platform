/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http',  hostname: 'localhost', port: '5000' },
    ],
  },
  async rewrites() {
    return [
      {
        // Proxy /uploads/* to the backend so images work directly
        source:      '/uploads/:path*',
        destination: 'http://localhost:5000/uploads/:path*',
      },
    ];
  },
};

export default nextConfig;

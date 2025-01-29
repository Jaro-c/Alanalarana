import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	compress: false, // Nginx compression
	poweredByHeader: false,
	experimental: {
		optimizePackageImports: ["millify"],
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.ytimg.com",
				pathname: "/vi/**",
			},
		],
	},
};

export default nextConfig;

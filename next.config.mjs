/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.ytimg.com",
				port: "",
				pathname: "/vi/**",
			},
		],
	},
};

export default nextConfig;

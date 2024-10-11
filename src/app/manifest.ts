import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: process.env.MD_Title,
		short_name: process.env.MD_Short_Title,
		description: process.env.MD_Description,
		start_url: "/",
		display: "fullscreen",
		background_color: "#fff",
		theme_color: "#fff",
		icons: [
			{
				src: "/favicon.ico",
				sizes: "48x48",
				type: "image/x-icon",
			},
			{
				src: "/android-chrome-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/android-chrome-512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
	};
}

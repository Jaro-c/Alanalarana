import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: process.env.MD_Title,
		short_name: process.env.MD_Short_Title,
		description: process.env.MD_Description,
		start_url: "/",
		display: "standalone",
		background_color: "#fff",
		theme_color: "#fff",
		icons: [
			{
				src: "/favicon.ico",
				sizes: "256x256",
				type: "image/x-icon",
			},
			{
				src: "/assets/icons/apple-touch-icon.png",
				sizes: "180x180",
				type: "image/png",
			},
		],
	};
}

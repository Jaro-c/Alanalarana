import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: [],
		},
		sitemap: process.env.MD_URL + "/sitemap.xml",
	};
}
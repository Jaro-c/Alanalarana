import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: process.env.MD_URL as string,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
	];
}

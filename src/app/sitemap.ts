import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const MainUrl = process.env.MD_URL as string;

	return [
		{
			url: MainUrl,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
		{
			url: MainUrl + "/raniza",
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.9,
		},
	];
}

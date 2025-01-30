"use server";

const API_KEY = process.env.API_YT_Key as string;
const ChannelID = process.env.API_YT_ChannelID as string;

export default async function ChannelInfo() {
	if (!API_KEY) {
		return { status: false };
	}

	const Url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${ChannelID}&key=${API_KEY}`;

	try {
		const response = await fetch(Url, {
			method: "GET",
			next: {
				revalidate: 1 * 60 * 60, // 1 hour
			},
		});
		const data = await response.json();

		if (data?.items.length) {
			const channel = data.items[0];
			return { status: true, channel: { title: channel.snippet.title, subscribers: channel.statistics.subscriberCount } };
		}

		return { status: false };
	} catch {
		return { status: false };
	}
}

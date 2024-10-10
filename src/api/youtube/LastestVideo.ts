"use server";

const API_KEY = process.env.API_YT_Key as string;
const ChannelID = process.env.API_YT_ChannelID as string;
const PlaylistId = `UU${ChannelID.slice(2)}`;

interface VideoProps {
	video: {
		id: string;
		createdAt: string;
		title: string;
		image: string;
	};
	channel: {
		title: string;
	};
}

// In-memory cache to store the last verified video
let cachedVideo: VideoProps | null = null;
let cacheExpirationTime = 0;

/*
	Main function to fetch the latest video
*/
export default async function LastestVideo() {
	if (isCacheValid()) {
		return { status: true, cache: true, data: cachedVideo };
	}

	const video = await fetchValidVideo();
	if (video) {
		cacheVideo(video);
		return { status: true, data: video };
	}

	return { status: false };
}

/*
	Fetches videos from YouTube and verifies which one is not a short
*/
async function fetchValidVideo() {
	const Url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&type=video&order=date&playlistId=${PlaylistId}&key=${API_KEY}`;

	try {
		const response = await fetch(Url, { method: "GET", next: { revalidate: 10 * 60 } }); // 10 minutes
		const data = await response.json();

		if (data?.items.length) {
			for (const item of data.items) {
				const video = item.snippet;

				const isRedirect = await checkRedirects(video.resourceId.videoId);
				if (!isRedirect) {
					continue;
				}

				const thumbnails = Object.keys(video.thumbnails).pop();
				const thumbnail = video.thumbnails[thumbnails as string];

				return { video: { createdAt: video.publishedAt, title: video.title, id: video.resourceId.videoId, image: thumbnail.url }, channel: { title: video.channelTitle } };
			}

			const video = data.items[0].snippet;
			const thumbnails = Object.keys(video.thumbnails).pop();
			const thumbnail = video.thumbnails[thumbnails as string];
			return { video: { createdAt: video.publishedAt, title: video.title, id: video.resourceId.videoId, image: thumbnail.url }, channel: { title: video.channelTitle } };
		}

		return null;
	} catch {
		return null;
	}
}

/*
	Verifies if the video redirects to a short
*/
async function checkRedirects(videoID: string) {
	const shortUrl = `https://www.youtube.com/shorts/${videoID}`;

	try {
		const response = await fetch(shortUrl, { method: "GET", redirect: "manual", next: { revalidate: 6 * 60 * 60 } }); // 6 hours
		return response.status >= 300 && response.status < 400;
	} catch {
		return false;
	}
}

/* 
	Checks if the cached video is still valid
*/
function isCacheValid() {
	const currentTime = Date.now();
	return cachedVideo && currentTime < cacheExpirationTime;
}

/*
	Stores the video in cache
*/
function cacheVideo(video: VideoProps) {
	cachedVideo = video;
	cacheExpirationTime = Date.now() + 10 * (60 * 1000); // Expires in 10 minutes
}

import dynamic from "next/dynamic";
import { Suspense } from "react";

import VideoInfo from "@/services/youtube/LastestVideo";

const Video = dynamic(() => import("./video"));

export default async function YT_Video() {
	const data = await VideoInfo();
	if (!data.status) return null;

	const createdAt = new Date(data.data?.video.createdAt);
	const now = new Date();
	const inHours = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

	return (
		<Suspense>
			<Video id={data.data?.video.id} title={data.data?.video.title} image={data.data?.video.image} newVideo={inHours <= 48} />
		</Suspense>
	);
}

import millify from "millify";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import { ChannelData } from "@/api/twitch/ChannelInfo";

const Twitch_Stream = dynamic(() => import("./stream"));

export default async function Twitch() {
	const data = await ChannelData();
	if (!data.status) return null;

	const subs = millify(Number(data.data?.followers), { precision: 2, locales: "es-ES" });
	const social = process.env.Social_Twitch;

	return (
		<a href={social} target="_blank" rel="noopener">
			<div className="button-style button-transition flex w-full items-center justify-between rounded-full p-4">
				<div className="flex select-none items-center justify-center space-x-2">
					{/* Icon */}
					<svg className="fill-secondary-200" width={24} height={24} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
					</svg>

					{/* Title */}
					<h2 className="button-title">{data.data.display_name}</h2>

					{/* Followers */}
					{data.data.followers && <span className="button-followers">{subs}</span>}
				</div>

				<Suspense>
					<Twitch_Stream />
				</Suspense>
			</div>
		</a>
	);
}

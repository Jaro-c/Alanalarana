import dynamic from "next/dynamic";
import numbro from "numbro";
import { Suspense } from "react";

import ChannelData from "@/api/youtube/ChannelInfo";

const Video = dynamic(() => import("./getVideo"));

export default async function YouTube() {
	const data = await ChannelData();
	if (!data.status) return null;

	const subs = numbro(Number(data.channel?.subscribers)).format({ average: true, mantissa: 2, trimMantissa: true });
	const social = process.env.Social_YouTube;

	return (
		<a href={social} target="_blank" rel="noopener" className="size-full">
			<div className="button-style button-transition flex w-full flex-col items-center justify-center space-y-4 rounded-2xl p-4">
				{/* Channel Info */}
				<div className="flex w-full items-center justify-between">
					<div className="flex select-none items-center justify-center space-x-2">
						{/* Icon */}
						<svg className="fill-secondary-200" width={24} height={24} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
						</svg>

						{/* Title */}
						<h2 className="button-title">{data.channel?.title}</h2>

						{/* Subscribers */}
						<span className="button-followers">{subs}</span>
					</div>

					<button className="button-transition rounded-full bg-primary-600 px-2 py-0.5 hover:shadow-[0px_0px_10px_1px_#09de79] md:px-3 md:py-1">
						<span className="select-none text-sm text-secondary-200 lg:text-base">Suscribirme</span>
					</button>
				</div>

				{/* Lastest Video */}
				<Suspense>
					<Video />
				</Suspense>
			</div>
		</a>
	);
}

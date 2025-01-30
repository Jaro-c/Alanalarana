import { isChannelLive } from "@/services/twitch/ChannelInfo";

export default async function Stream() {
	const data = await isChannelLive();

	return (
		<>
			{data.status ? (
				<div className="relative flex h-6 w-16 items-center justify-center rounded-full bg-red shadow-[0px_0px_10px_1px_#FF0000] lg:h-7 lg:w-[4.5rem]">
					<span className="z-10 select-none text-center text-sm font-medium text-secondary-200 lg:text-base">Online</span>
					<div className="absolute z-0 h-4/5 w-[70%] animate-ping rounded-full bg-red"></div>
				</div>
			) : (
				<div className="rounded-full border border-gray-dark/10 bg-gray-darker px-3 py-0.5">
					<span className="select-none text-sm font-medium text-secondary-200 lg:text-base">Offline</span>
				</div>
			)}
		</>
	);
}

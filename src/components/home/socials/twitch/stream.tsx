import { isChannelLive } from "@/api/twitch/ChannelInfo";

export default async function Stream() {
	const data = await isChannelLive();

	return (
		<>
			{data.status ? (
				<div className="rounded-full bg-red px-2 py-0.5 shadow-[0px_0px_10px_1px_#FF0000]">
					<span className="select-none text-sm font-medium text-secondary-200 lg:text-base">Online</span>
				</div>
			) : (
				<div className="rounded-full border border-gray-dark/10 bg-gray-darker px-2 py-0.5">
					<span className="select-none text-sm font-medium text-secondary-200 lg:text-base">Offline</span>
				</div>
			)}
		</>
	);
}

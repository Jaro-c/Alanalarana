import millify from "millify";

import AccountData from "@/services/tiktok/AccountInfo";

interface TikTokProps {
	user_id: string;
	social: string;
}

export default async function TikTok({ user_id, social }: TikTokProps) {
	const data = await AccountData(user_id);
	if (!data.status) return null;

	const subs = millify(Number(data.data?.stats.followerCount), { precision: 2, locales: "es-ES" });

	return (
		<a href={social} target="_blank" rel="noopener">
			<div className="button-style button-transition flex h-14 w-full items-center justify-between rounded-full px-4">
				<div className="flex select-none items-center justify-center gap-2">
					{/* Icon */}
					<svg className="fill-secondary-200" width={24} height={24} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
					</svg>

					{/* Title */}
					<h2 className="button-title">{data.data.user.nickname}</h2>

					{/* Followers */}
					{data.data.stats && <span className="button-followers">{subs}</span>}
				</div>

				<button className="button-transition rounded-full bg-primary-600 px-3 py-0.5 hover:shadow-[0px_0px_10px_1px_#09de79]">
					<span className="select-none text-sm text-secondary-200 lg:text-base">Seguir</span>
				</button>
			</div>
		</a>
	);
}

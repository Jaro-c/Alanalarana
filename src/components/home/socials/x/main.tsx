import millify from "millify";

import ProfileData from "@/api/x/ProfileInfo";

interface XProps {
	username: string;
	social: string;
}

export default async function X({ username, social }: XProps) {
	const data = await ProfileData(username);
	if (!data.status) return null;

	const subs = millify(Number(data.data?.public_metrics.followers_count), { precision: 2, locales: "es-ES" });

	return (
		<a href={social} target="_blank" rel="noopener">
			<div className="button-style button-transition flex h-14 w-full items-center justify-between rounded-full px-4">
				<div className="flex select-none items-center justify-center space-x-2">
					{/* Icon */}
					<svg className="fill-secondary-200" width={24} height={24} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
					</svg>

					{/* Title */}
					<h2 className="button-title">{data.data.name}</h2>

					{/* Followers */}
					{data.data.public_metrics && <span className="button-followers">{subs}</span>}
				</div>

				<button className="button-transition rounded-full bg-primary-600 px-3 py-0.5 hover:shadow-[0px_0px_10px_1px_#09de79]">
					<span className="select-none text-sm text-secondary-200 lg:text-base">Seguir</span>
				</button>
			</div>
		</a>
	);
}

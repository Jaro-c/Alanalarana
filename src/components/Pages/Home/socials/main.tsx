import dynamic from "next/dynamic";
import { Suspense } from "react";

const Twitch = dynamic(() => import("@/components/Pages/Home/socials/twitch/main"));
const YouTube = dynamic(() => import("@/components/Pages/Home/socials/youtube/main"));
const Instagram = dynamic(() => import("@/components/Pages/Home/socials/instagram/main"));
const Twitter = dynamic(() => import("@/components/Pages/Home/socials/x/main"));
const TikTok = dynamic(() => import("@/components/Pages/Home/socials/tiktok/main"));

export default function Social_Media() {
	const social_style = "w-full button-transition hover:my-2 hover:scale-105";
	const social_skeleton = "button-style button-transition h-14 animate-pulse rounded-full";

	return (
		<nav className="w-full md:max-xl:w-[90%] lg:h-[90vh] xl:h-[80vh] xl:w-4/5 2xl:h-[90vh] 2xl:w-[70%]">
			<ul className="flex size-full flex-col items-center gap-2">
				{/* Twitch */}
				<li className={social_style}>
					<Suspense fallback={<div className={social_skeleton}></div>}>
						<Twitch />
					</Suspense>
				</li>

				{/* Kick */}

				{/* YouTube */}
				<li className={`${social_style} hover:my-4`}>
					<Suspense fallback={<div className={social_skeleton}></div>}>
						<YouTube />
					</Suspense>
				</li>

				{/* X or Twitter */}
				<li className={social_style}>
					<Suspense>{/* <Twitter username={process.env.API_X_Username as string} social={process.env.Social_X as string} /> */}</Suspense>
				</li>

				{/* Instagram */}
				<li className={social_style}>
					<Suspense>{/* <Instagram username={process.env.API_IG_Username as string} social={process.env.Social_Instagram as string} /> */}</Suspense>
				</li>

				{/* TikTok */}
				<li className={social_style}>
					<Suspense>{/* <TikTok user_id={process.env.API_TK_UserID as string} social={process.env.Social_TikTok as string} /> */}</Suspense>
				</li>
			</ul>
		</nav>
	);
}

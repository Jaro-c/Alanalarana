import dynamic from "next/dynamic";
import { Suspense } from "react";

const YouTube = dynamic(() => import("@/components/home/socials/youtube/main"));

export default function Social_Media() {
	const social_width = "w-full md:max-xl:w-[90%] xl:w-[80%] 2xl:w-[70%] button-transition md:hover:scale-105 md:hover:my-2";

	return (
		<nav className="w-full lg:h-[90vh] xl:h-[80vh] 2xl:h-[90vh]">
			<ul className="flex size-full flex-col items-center space-y-4">
				{/* Social: Twitch */}

				{/* Social: YouTube */}
				<li className={social_width}>
					<Suspense>
						<YouTube />
					</Suspense>
				</li>

				{/* Social: Instagram */}

				{/* Social: TikTok */}
				{/* Social: Discord */}
				{/* Social: X/Twitter */}
			</ul>
		</nav>
	);
}

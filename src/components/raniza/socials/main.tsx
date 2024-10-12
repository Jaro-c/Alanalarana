import dynamic from "next/dynamic";
import { Suspense } from "react";

const Instagram = dynamic(() => import("@/components/home/socials/instagram/main"));

export default function Social_Media() {
	const social_style = "w-full button-transition hover:my-2 hover:scale-105";

	return (
		<nav className="w-full md:max-xl:w-[90%] lg:h-[90vh] xl:h-[80vh] xl:w-4/5 2xl:h-[90vh] 2xl:w-[70%]">
			<ul className="flex size-full flex-col items-center gap-2">
				{/* Instagram */}
				<li className={social_style}>
					<Suspense>
						<Instagram username={process.env.API_IG_R_Username as string} social={process.env.Social_R_Instagram as string} />
					</Suspense>
				</li>
			</ul>
		</nav>
	);
}

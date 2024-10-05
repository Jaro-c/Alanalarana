import dynamic from "next/dynamic";
import { Suspense } from "react";

import styles from "./styles.module.css";

const Profile = dynamic(() => import("@/components/home/profile/main"));
const SocialMedia = dynamic(() => import("@/components/home/socials/main"));

const Developers = dynamic(() => import("@/components/home/developers"));

export default function Home() {
	return (
		<div className={`${styles["background-section"]} h-full`}>
			<div className="flex h-full flex-col">
				<div className="container flex h-full flex-col py-8 max-lg:space-y-4 lg:flex-row">
					{/* Alana: Profile */}
					<div className="w-full lg:w-1/2">
						<Suspense>
							<Profile />
						</Suspense>
					</div>

					{/* Alana: Socials */}
					<div className="w-full lg:w-1/2">
						<Suspense>
							<SocialMedia />
						</Suspense>
					</div>
				</div>

				{/* Developers */}
				<Developers />
			</div>
		</div>
	);
}

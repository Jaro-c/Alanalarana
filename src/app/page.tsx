import dynamic from "next/dynamic";
import { Suspense } from "react";

import styles from "./styles.module.css";

const Profile = dynamic(() => import("@/components/home/profile/main"));
const SocialMedia = dynamic(() => import("@/components/home/socials/main"));

const Developers = dynamic(() => import("@/components/developers"));

export default function Home() {
	return (
		<div className={`${styles["background-section"]} h-full`}>
			<div className="container h-full py-4">
				<div className="flex size-full flex-col py-4">
					{/* Alanalarana */}
					<div className="flex size-full flex-col items-center justify-center max-lg:space-y-4 lg:flex-row">
						{/* Alana: Profile */}
						<section className="w-full lg:w-1/2">
							<Suspense>
								<Profile />
							</Suspense>
						</section>

						{/* Alana: Socials */}
						<section className="size-full lg:w-1/2">
							<Suspense>
								<SocialMedia />
							</Suspense>
						</section>
					</div>

					{/* Developers */}
					<Developers />
				</div>
			</div>
		</div>
	);
}

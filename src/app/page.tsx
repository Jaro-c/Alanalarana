import dynamic from "next/dynamic";
import { Suspense } from "react";

import styles from "./styles.module.css";

const Profile = dynamic(() => import("@/components/Pages/Home/profile/main"));
const SocialMedia = dynamic(() => import("@/components/Pages/Home/socials/main"));

const Developers = dynamic(() => import("@/components/developers"));

export default function Home() {
	return (
		<div className={`${styles["background-section"]} size-full`}>
			<div className="container h-full py-4">
				<div className="flex size-full flex-col items-center justify-center gap-4">
					{/* Alanalarana */}
					<div className="flex size-full flex-col items-center justify-start max-lg:gap-2 lg:flex-row lg:justify-center">
						{/* Alana: Profile */}
						<section className="w-full lg:w-1/2">
							<Suspense>
								<Profile />
							</Suspense>
						</section>

						{/* Alana: Socials */}
						<section className="flex size-full items-start justify-center lg:w-1/2 lg:items-center">
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

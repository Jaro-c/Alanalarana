import dynamic from "next/dynamic";
import { Suspense } from "react";

import styles from "./styles.module.css";

const Profile = dynamic(() => import("@/components/raniza/profile/main"));

const Developers = dynamic(() => import("@/components/developers"));

export default function Raniza() {
	return (
		<div className={`${styles["background-section"]} h-full`}>
			<div className="flex h-full flex-col py-4">
				{/* Raniza */}
				<div className="container my-4 flex h-full flex-col items-center justify-center max-lg:space-y-4 lg:flex-row">
					{/* Raniza: Profile */}
					<div className="w-full lg:w-1/2">
						<Suspense>
							<Profile />
						</Suspense>
					</div>

					{/* Raniza: Socials */}
					<div className="size-full lg:w-1/2">
						<Suspense></Suspense>
					</div>
				</div>

				{/* Developers */}
				<Developers />
			</div>
		</div>
	);
}

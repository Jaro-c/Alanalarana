import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: process.env.MD_R_Title,
	description: process.env.MD_R_Description,
	keywords: process.env.MD_R_Keywords,
	alternates: {
		canonical: "/raniza",
	},
	category: "Club Deportivo",
	openGraph: {
		title: process.env.MD_R_Title,
		description: process.env.MD_R_Description,
		url: "/raniza",
		siteName: process.env.MD_Title,
		locale: "es",
		type: "website",
		images: [
			{
				url: process.env.MD_URL + "/assets/og-banner.webp",
				width: 1500,
				height: 500,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: process.env.MD_R_Title,
		description: process.env.MD_R_Description,
		images: [process.env.MD_URL + "/assets/og-banner.webp"],
		site: "@" + process.env.API_X_R_Username,
	},
};

import styles from "./styles.module.css";

const Profile = dynamic(() => import("@/components/Pages/Raniza/profile/main"));
const SocialMedia = dynamic(() => import("@/components/Pages/Raniza/socials/main"));

const Developers = dynamic(() => import("@/components/developers"));

export default function Raniza() {
	return (
		<div className={`${styles["background-section"]} size-full`}>
			<div className="container h-full py-4">
				<div className="flex size-full flex-col items-center justify-center gap-4">
					{/* Raniza */}
					<div className="flex size-full flex-col items-center justify-start max-lg:gap-2 lg:flex-row lg:justify-center">
						{/* Raniza: Profile */}
						<section className="w-full lg:w-1/2">
							<Suspense>
								<Profile />
							</Suspense>
						</section>

						{/* Raniza: Socials */}
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

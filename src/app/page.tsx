import dynamic from "next/dynamic";

import styles from "./styles.module.css";

const Developers = dynamic(() => import("@/components/home/developers"));

export default function Home() {
	return (
		<div className={`${styles["background-section"]} h-full`}>
			<div className="flex flex-col">
				<div>
					<div></div>
				</div>

				{/* Developers */}
				<Developers />
			</div>
		</div>
	);
}

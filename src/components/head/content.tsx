import { Partytown } from "@builder.io/partytown/react";
import { headers } from "next/headers";
import Script from "next/script";

export default function Head_Content() {
	const nonce = headers().get("x-nonce") as string;

	return (
		<>
			<Partytown debug={process.env.NODE_ENV === "development"} nonce={nonce} forward={["dataLayer.push"]} />

			<Script nonce={nonce} id="google-analytics-first-script" type="text/partytown" strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-G3N793GHZB" />
			<Script nonce={nonce} id="google-analytics-second-script" type="text/partytown" strategy="afterInteractive" src="/scripts/analytics.js" />
		</>
	);
}

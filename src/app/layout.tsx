import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import Script from "next/script";

export const metadata: Metadata = {
	metadataBase: new URL(process.env.MD_URL as string),
	title: {
		template: "%s | " + process.env.MD_Title,
		default: process.env.MD_Title as string,
	},
	description: process.env.MD_Description,
	keywords: process.env.MD_Keywords,
	alternates: {
		canonical: "/",
	},
	category: "Creador de Contenido",
	assets: "/assets",
	openGraph: {
		title: {
			template: "%s | " + process.env.MD_Title,
			default: process.env.MD_Title as string,
		},
		description: process.env.MD_Description,
		url: process.env.MD_URL,
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
		title: {
			template: "%s | " + process.env.MD_Title,
			default: process.env.MD_Title as string,
		},
		description: process.env.MD_Description,
		images: [process.env.MD_URL + "/assets/og-banner.webp"],
		site: "@" + process.env.API_X_Username,
	},
	icons: {
		icon: "/favicon.ico",
		apple: "/assets/icons/apple-touch-icon.png",
		other: {
			rel: "apple-touch-icon-precomposed",
			url: "/assets/icons/apple-touch-icon.png",
		},
	},
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export const viewport: Viewport = {
	colorScheme: "dark",
};

/* Font */
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

/* Components */
import "./globals.css";

export default async function Root_Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	const nonce = (await headers()).get("x-nonce");

	return (
		<html lang="es">
			<body className={`${poppins.className} antialiased`}>
				<main className="flex min-h-screen max-w-full">
					<div className="w-full grow">{children}</div>
				</main>

				{/* Google Analytics */}
				<Script nonce={nonce as string} strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-G3N793GHZB" />
				<Script nonce={nonce as string} id="google-analytics" strategy="afterInteractive">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-G3N793GHZB');
					`}
				</Script>
			</body>
		</html>
	);
}

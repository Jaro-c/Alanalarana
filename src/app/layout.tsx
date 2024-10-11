/* SEO */
import type { Metadata } from "next";
export const metadata: Metadata = {
	metadataBase: new URL(process.env.MD_URL as string),
	title: {
		template: "%s | " + (process.env.MD_Title as string),
		default: process.env.MD_Title as string,
	},
	description: process.env.MD_Description,
	keywords: process.env.MD_Keywords,
	alternates: {
		canonical: "/",
	},
	category: "Creador de Contenido",
	openGraph: {
		title: {
			template: "%s | " + (process.env.MD_Title as string),
			default: process.env.MD_Title as string,
		},
		description: process.env.MD_Description,
		url: process.env.MD_URL,
		siteName: process.env.MD_Title,
		locale: "es",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			"max-video-preview": "large",
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

/* Font */
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

/* Components */
import "./globals.css";

export default function Root_Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="es">
			<body className={`${poppins.className} antialiased`}>
				<main className="flex min-h-screen max-w-screen-4xl">
					<div className="w-full grow">{children}</div>
				</main>
			</body>
		</html>
	);
}

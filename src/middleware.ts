import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function generateNonce() {
	const array = new Uint8Array(30);
	crypto.getRandomValues(array);
	return btoa(String.fromCharCode(...array));
}

export function middleware(request: NextRequest) {
	/* Add headers */
	const nonce = generateNonce();
	const cspHeader = `
		default-src 'self';
		connect-src 'self' https://www.googletagmanager.com;
		script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${process.env.NODE_ENV === "development" ? "'unsafe-eval'" : ""};
		script-src-attr 'self' 'nonce-${nonce}';
		script-src-elem 'self' 'nonce-${nonce}' 'unsafe-inline';
		style-src 'self' 'nonce-${nonce}';
		style-src-elem 'self' 'nonce-${nonce}';
		style-src-attr 'self' 'unsafe-inline';
		img-src 'self' blob: data:;
		font-src 'self';
		object-src 'none';
		base-uri 'self';
		form-action 'self';
		frame-ancestors 'none';
		worker-src 'self' blob:;
		upgrade-insecure-requests;`;
	const ContentSecurityPolicy = cspHeader.replace(/\s{2,}/g, " ").trim();

	/* Headers */
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-nonce", nonce);

	/* Server - Headers */
	const response = NextResponse.next({ request: { headers: requestHeaders } });

	response.headers.set("Content-Security-Policy", ContentSecurityPolicy);
	response.headers.set("X-Content-Type-Options", "nosniff");
	response.headers.set("X-Frame-Options", "DENY");
	response.headers.set("X-XSS-Protection", "1; mode=block");
	response.headers.set("Referrer-Policy", "no-referrer");

	response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
	response.headers.set("Cross-Origin-Embedder-Policy", "require-corp");
	response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
	response.headers.set("X-Download-Options", "noopen");
	response.headers.set("X-Permitted-Cross-Domain-Policies", "none");
	response.headers.set("Origin-Agent-Cluster", "?1");

	return response;
}

export const config = {
	matcher: [
		{
			source: "/((?!api|_next/static|_next/image|favicon.ico|manifest.webmanifest|sitemap.xml|robots.txt).*)",
			missing: [
				{ type: "header", key: "next-router-prefetch" },
				{ type: "header", key: "purpose", value: "prefetch" },
			],
		},
	],
};

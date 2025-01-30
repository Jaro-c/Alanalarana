import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
	const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
	const cspHeader = `
		default-src 'self';
		connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com;
		script-src 'self' 'nonce-${nonce}' ${process.env.NODE_ENV === "development" ? "'unsafe-eval'" : "'strict-dynamic'"};
		script-src-attr 'self' 'nonce-${nonce}';
		script-src-elem 'self' 'nonce-${nonce}';
		img-src 'self' blob: data: https://*.google-analytics.com https://*.googletagmanager.com;
		font-src 'self';
		object-src 'none';
		base-uri 'self';
		form-action 'self';
		frame-ancestors 'none';
		worker-src 'self';
		style-src 'self' 'nonce-${nonce}';
		style-src-attr 'self' 'nonce-${nonce}';
		style-src-elem 'self' 'nonce-${nonce}';
		upgrade-insecure-requests;`;
	// Replace newline characters and spaces
	const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, " ").trim();

	// Set headers
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-nonce", nonce);
	requestHeaders.set("Content-Security-Policy", contentSecurityPolicyHeaderValue);

	// Next response
	const response = NextResponse.next({ request: { headers: requestHeaders } });

	response.headers.set("Content-Security-Policy", contentSecurityPolicyHeaderValue);
	response.headers.set("X-XSS-Protection", "1; mode=block");
	response.headers.set("X-Permitted-Cross-Domain-Policies", "none");
	response.headers.set("X-Frame-Options", "DENY");
	response.headers.set("X-Download-Options", "noopen");
	response.headers.set("X-Content-Type-Options", "nosniff");

	response.headers.set("Referrer-Policy", "same-origin");
	response.headers.set("Origin-Agent-Cluster", "?1");
	response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
	response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
	response.headers.set("Cross-Origin-Embedder-Policy", "require-corp");

	return response;
}

export const config = {
	matcher: [
		{
			source: "/((?!api|_next/static|_next/image|favicon.ico|manifest.webmanifest|sitemap.xml|robots.txt|assets).*)",
			missing: [
				{ type: "header", key: "next-router-prefetch" },
				{ type: "header", key: "purpose", value: "prefetch" },
			],
		},
	],
};

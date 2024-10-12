"use server";

const ClientKey = process.env.API_IG_Key as string;

export default async function AccountInfo(username: string) {
	if (!ClientKey) {
		return { status: false };
	}

	try {
		const response = await fetch("https://instagram-scraper-api2.p.rapidapi.com/v1/info?username_or_id_or_url=" + username, {
			method: "GET",
			headers: { "x-rapidapi-key": ClientKey, "x-rapidapi-host": "instagram-scraper-api2.p.rapidapi.com" },
			next: { revalidate: 6 * 60 * 60 }, // 6 hours
		});

		const data = await response.json();
		return { status: !!data.data, data: data.data };
	} catch {
		return { status: false };
	}
}

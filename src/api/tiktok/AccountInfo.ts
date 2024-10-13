"use server";

const ClientKey = process.env.API_TK_Key as string;

export default async function AccountInfo(user_id: string) {
	if (!ClientKey) {
		return { status: false };
	}

	try {
		const response = await fetch("https://tiktok-scraper7.p.rapidapi.com/user/info?user_id=" + user_id, {
			method: "GET",
			headers: { "x-rapidapi-key": ClientKey, "x-rapidapi-host": "tiktok-scraper7.p.rapidapi.com" },
			next: { revalidate: 8 * 60 * 60 }, // 8 hours
		});

		const data = await response.json();
		return { status: !!data.data, data: data.data };
	} catch {
		return { status: false };
	}
}

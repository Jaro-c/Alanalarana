"use server";

const TwitterToken = process.env.API_X_Token as string;

export default async function ProfileInfo(username: string) {
	if (!TwitterToken) {
		return { status: false };
	}

	try {
		const response = await fetch("https://api.twitter.com/2/users/by/username/" + username + "?user.fields=public_metrics", {
			method: "GET",
			headers: { Authorization: "Bearer " + TwitterToken },
			next: { revalidate: 3 * 60 * 60 }, // 3 hours
		});

		const data = await response.json();
		return { status: !!data.data, data: data.data };
	} catch {
		return { status: false };
	}
}

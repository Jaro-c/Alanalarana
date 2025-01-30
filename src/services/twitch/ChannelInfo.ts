"use server";

const ClientID = process.env.API_T_ClientID as string;
const ClientSecret = process.env.API_T_ClientSecret as string;
const ChannelID = process.env.API_T_ChannelID as string;

interface TwitchToken {
	token: string;
	expires: number;
}

let save_token: TwitchToken | null = null;

async function getTwitchToken() {
	if (save_token && save_token.expires > Date.now()) {
		return save_token.token;
	}

	try {
		const response = await fetch("https://id.twitch.tv/oauth2/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				client_id: ClientID,
				client_secret: ClientSecret,
				grant_type: "client_credentials",
			}),
		});

		const data = await response.json();

		save_token = {
			token: data.access_token,
			expires: Date.now() + data.expires_in * 1000,
		};

		return data.access_token;
	} catch {
		return false;
	}
}

export async function isChannelLive() {
	if (!ClientID || !ClientSecret) {
		return { status: false };
	}

	try {
		const accessToken = await getTwitchToken();
		if (!accessToken) {
			return { status: false };
		}

		const response = await fetch("https://api.twitch.tv/helix/streams?user_id=" + ChannelID, {
			method: "GET",
			headers: {
				"Client-ID": ClientID,
				Authorization: "Bearer " + accessToken,
			},
			next: {
				revalidate: 2 * 60, // 2 minutes
			},
		});

		const data = await response.json();
		return { status: data.data[0].type === "live" };
	} catch {
		return { status: false };
	}
}

async function ChannelFollowers(accessToken: string) {
	try {
		const response = await fetch("https://api.twitch.tv/helix/channels/followers?broadcaster_id=" + ChannelID, {
			method: "GET",
			headers: {
				"Client-ID": ClientID,
				Authorization: "Bearer " + accessToken,
			},
			next: {
				revalidate: 1 * 60 * 60, // 1 hour
			},
		});

		const data = await response.json();
		return data.total;
	} catch {
		return false;
	}
}

export async function ChannelData() {
	if (!ClientID || !ClientSecret) {
		return { status: false };
	}

	try {
		const accessToken = await getTwitchToken();
		if (!accessToken) {
			return { status: false };
		}

		// Channel Info
		const response = await fetch("https://api.twitch.tv/helix/users?id=" + ChannelID, {
			method: "GET",
			headers: {
				"Client-ID": ClientID,
				Authorization: "Bearer " + accessToken,
			},
			next: {
				revalidate: 12 * 60 * 60, // 12 hours
			},
		});
		const data = await response.json();

		// Channel Followers
		const getFollowers = await ChannelFollowers(accessToken);

		return { status: true, data: { ...data.data[0], followers: getFollowers } };
	} catch {
		return { status: false };
	}
}

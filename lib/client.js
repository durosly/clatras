import { Client, Account } from "appwrite";

const client = new Client();

client
	.setEndpoint("https://cloud.appwrite.io/v1")
	.setProject("64cec8180be1c3124063");

const account = new Account(client);

export const AppwriteService = {
	setSession: (hash) => {
		const authCookies = {};
		authCookies["a_session_" + "64cec8180be1c3124063"] = hash;
		client.headers["X-Fallback-Cookies"] = JSON.stringify(authCookies);
	},
	getAccount: async () => {
		return await account.get();
	},
	deleteSession: async () => {
		return await account.deleteSession("current");
	},
};

export default client;

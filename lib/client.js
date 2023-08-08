import { Client, Account } from "appwrite";

const client = new Client();

client
	.setEndpoint(process.env.NEXT_PUBLIC_APPRWRITE_ENDPOINT)
	.setProject(process.env.NEXT_PUBLIC_APPRWRITE_PROJECT_ID);

const account = new Account(client);

class AppwriteClient {
	async loginUser(email, password) {
		const info = await account.createEmailSession(email, password);

		return info;
	}

	async logoutCurrent() {
		await account.deleteSessions("current");
	}

	async getCurrentUser() {
		const info = account.get();

		return info;
	}

	async getJWT() {
		const jwt = await account.createJWT();

		return jwt;
	}
}

const appwriteClient = new AppwriteClient();

export { appwriteClient };

export default client;

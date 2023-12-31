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

	async sendVerificationEmail() {
		const url = new URL(process.env.NEXT_PUBLIC_URL);
		const token = await account.createVerification(
			`${url.href}/verify-email`
		);
		return token;
	}

	async sendPasswordRecoveryEmail(email) {
		const url = new URL(process.env.NEXT_PUBLIC_URL);
		const response = await account.createRecovery(
			email,
			`${url.href}/forgot-password/reset`
		);

		return response;
	}

	async verifyUserByEmail(userId, secret) {
		const res = account.updateVerification(userId, secret);
		return res;
	}

	async getJWT() {
		const jwt = await account.createJWT();

		return jwt;
	}

	async changePassword(password, old_password) {
		const res = await account.updatePassword(password, old_password);
		return res;
	}
}

const appwriteClient = new AppwriteClient();

export { appwriteClient };

export default client;

// const sdk = require('node-appwrite');
import { Account, Client } from "node-appwrite";

// Init SDK
const clientServer = new Client();

clientServer
	.setEndpoint(process.env.NEXT_PUBLIC_APPRWRITE_ENDPOINT) // Your API Endpoint
	.setProject(process.env.NEXT_PUBLIC_APPRWRITE_PROJECT_ID); // Your project ID
// .setKey(process.env.APPWRITE_API_KEY); // Your secret API key

class AppwriteServerClient {
	#server = null;
	#account = null;
	constructor() {
		this.#server = new Client();
		this.#server
			.setEndpoint(process.env.NEXT_PUBLIC_APPRWRITE_ENDPOINT)
			.setProject(process.env.NEXT_PUBLIC_APPRWRITE_PROJECT_ID);
	}

	setToken(jwt) {
		this.#server.setJWT(jwt);
	}

	setKey() {
		this.#server.setKey(process.env.APPWRITE_API_KEY);
	}

	async getAccount() {
		this.#account = new Account(this.#server);

		const info = await this.#account.get();

		return info;
	}
}

export { AppwriteServerClient };

export default clientServer;

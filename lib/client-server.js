// const sdk = require('node-appwrite');
import sdk from "node-appwrite";

// Init SDK
const clientServer = new sdk.Client();

clientServer
	.setEndpoint(process.env.NEXT_PUBLIC_APPRWRITE_ENDPOINT) // Your API Endpoint
	.setProject(process.env.NEXT_PUBLIC_APPRWRITE_PROJECT_ID); // Your project ID
// .setKey(process.env.APPWRITE_API_KEY); // Your secret API key

export default clientServer;

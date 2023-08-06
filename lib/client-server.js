// const sdk = require('node-appwrite');
import sdk from "node-appwrite";

// Init SDK
const clientServer = new sdk.Client();

clientServer
	.setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
	.setProject("64cec8180be1c3124063") // Your project ID
	.setKey(process.env.APPWRITE_API_KEY); // Your secret API key

export default clientServer;

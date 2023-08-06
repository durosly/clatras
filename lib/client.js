import { Client } from "appwrite";

const client = new Client();

client
	.setEndpoint("https://cloud.appwrite.io/v1")
	.setProject("64cec8180be1c3124063");

export default client;

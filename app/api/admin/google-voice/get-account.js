import { AppwriteServerClient } from "@/lib/client-server";
import { NextResponse } from "next/server";
import { Databases, Query } from "node-appwrite";

async function getGoogleVoiceAccount(request) {
	try {
		const app = new AppwriteServerClient();
		app.setKey();
		const server = app.getServer();
		const database = new Databases(server);
		let database_id = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
		let collection_id =
			process.env.NEXT_PUBLIC_APPRWRITE_G_VOICE_COLLECTION_ID;

		const docs = await database.listDocuments(database_id, collection_id, [
			Query.limit(1),
		]);

		return NextResponse.json({
			status: true,
			message: "successfully",
			doc: docs.documents[0],
		});
	} catch (error) {
		console.log(error);
		return new Response(
			JSON.stringify({ status: false, message: error.message }),
			{
				status: 401,
				headers: { "Content-Type": `application/json` },
			}
		);
	}
}

export default getGoogleVoiceAccount;

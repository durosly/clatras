import { AppwriteServerClient } from "@/lib/client-server";
import { NextResponse } from "next/server";
import { Databases } from "node-appwrite";

async function updateGoogleVoiceAccount(request) {
	try {
		const app = new AppwriteServerClient();
		app.setKey();
		const server = app.getServer();
		const database = new Databases(server);
		let database_id = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
		let collection_id =
			process.env.NEXT_PUBLIC_APPRWRITE_G_VOICE_COLLECTION_ID;

		const { id, cost, bank_name, account_name, account_number } =
			await request.json();
		let update = {
			cost,
			bank_name,
			account_name,
			account_number,
		};

		await database.updateDocument(database_id, collection_id, id, update);

		return NextResponse.json({
			status: true,
			message: "successfully",
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

export default updateGoogleVoiceAccount;

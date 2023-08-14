import { AppwriteServerClient } from "@/lib/client-server";
import { NextResponse } from "next/server";
import { Databases } from "node-appwrite";

async function updateTransactionStatus(request) {
	try {
		const { status, id } = await request.json();
		if (status !== "success" && status !== "declined") {
			return new Response(
				JSON.stringify({
					status: false,
					message: "Invalid status entry",
				}),
				{
					status: 401,
					headers: { "Content-Type": `application/json` },
				}
			);
		}

		if (!id) {
			return new Response(
				JSON.stringify({
					status: false,
					message: "No document selected",
				}),
				{
					status: 401,
					headers: { "Content-Type": `application/json` },
				}
			);
		}

		const app = new AppwriteServerClient();
		app.setKey();
		const server = app.getServer();

		const databases = new Databases(server);

		let databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
		let collectionId =
			process.env.NEXT_PUBLIC_APPRWRITE_TRANSACTION_COLLECTION_ID;

		await databases.updateDocument(databaseId, collectionId, id, {
			status,
		});

		return NextResponse.json({ status: true, message: "Status updated" });
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

export default updateTransactionStatus;

import { AppwriteServerClient } from "@/lib/client-server";
import { NextResponse } from "next/server";
import { Databases, ID } from "node-appwrite";

export default async function deleteCrypto(request) {
	try {
		const url = new URL(request.url);

		const id = url.searchParams.get("id");

		const app = new AppwriteServerClient();
		app.setKey();
		const server = app.getServer();

		const databases = new Databases(server);

		let databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
		let collectionId =
			process.env.NEXT_PUBLIC_APPRWRITE_CRYPTO_INFO_COLLECTION_ID;

		const doc = await databases.deleteDocument(
			databaseId,
			collectionId,
			id
		);

		return NextResponse.json({
			status: true,
			message: "successfully",
			doc,
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

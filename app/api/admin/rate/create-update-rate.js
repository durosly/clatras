import { AppwriteServerClient } from "@/lib/client-server";
import { NextResponse } from "next/server";
import { Databases, ID, Query } from "node-appwrite";

export default async function createUpdateRate(request) {
	try {
		const { rate } = await request.json();

		console.log({ rate });

		if (!rate) {
			return new Response(
				JSON.stringify({
					status: false,
					message: "Rate cannot be empty",
				}),
				{
					status: 400,
					headers: { "Content-Type": `application/json` },
				}
			);
		} else if (!Number(rate)) {
			return new Response(
				JSON.stringify({
					status: false,
					message: "Rate must be a valid number",
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
			process.env.NEXT_PUBLIC_APPRWRITE_DOLLAR_RATE_COLLECTION_ID;

		const doc = await databases.listDocuments(databaseId, collectionId, [
			Query.limit(1),
		]);

		console.log(doc);

		if (doc.total === 0) {
			await databases.createDocument(
				databaseId,
				collectionId,
				ID.unique(),
				{ rate }
			);
		} else {
			const id = doc.documents[0].$id;
			databases.updateDocument(databaseId, collectionId, id, { rate });
		}

		return NextResponse.json({
			status: true,
			message: "successfully",
			// doc: data,
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

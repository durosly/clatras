import { AppwriteServerClient } from "@/lib/client-server";
import { NextResponse } from "next/server";
import { Databases, ID, Query } from "node-appwrite";

export default async function createUpdateemail(request) {
	try {
		const { email } = await request.json();

		if (!email) {
			return new Response(
				JSON.stringify({
					status: false,
					message: "email cannot be empty",
				}),
				{
					status: 400,
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
			process.env
				.NEXT_PUBLIC_APPRWRITE_ADMIN_EMAIL_NOTIFICATION_COLLECTION_ID;

		const doc = await databases.listDocuments(databaseId, collectionId, [
			Query.limit(1),
		]);

		if (doc.total === 0) {
			await databases.createDocument(
				databaseId,
				collectionId,
				ID.unique(),
				{ email }
			);
		} else {
			const id = doc.documents[0].$id;
			databases.updateDocument(databaseId, collectionId, id, { email });
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

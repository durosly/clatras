import clientServer from "@/lib/client-server";
import { NextResponse } from "next/server";
import { AppwriteException, Databases } from "node-appwrite";

async function deleteNotice(request) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");

		if (!id) {
			return new Response(
				JSON.stringify({
					status: false,
					message: "No ID specified",
				}),
				{
					status: 400,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
		}

		clientServer.setKey(process.env.APPWRITE_API_KEY);

		const databases = new Databases(clientServer);

		let databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
		let collectionId =
			process.env.NEXT_PUBLIC_APPRWRITE_ADMIN_USER_NOTICE_COLLECTION_ID;

		await databases.deleteDocument(databaseId, collectionId, id);

		return NextResponse.json({
			status: true,
			message: "Notice success",
		});
	} catch (error) {
		let message = "Something went wrong";
		let code = 500;
		// console.log(error);
		if (error instanceof AppwriteException) {
			message = error.response.message;
			code = error.code;
		}

		return new Response(
			JSON.stringify({
				status: false,
				message,
			}),
			{
				status: code,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	}
}

export default deleteNotice;

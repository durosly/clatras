import clientServer from "@/lib/client-server";
import { NextResponse } from "next/server";
import { AppwriteException, Databases, ID } from "node-appwrite";

async function createNotice(request) {
	try {
		const { message, title, type, expires_at } = await request.json();

		if (!message) {
			return new Response(
				JSON.stringify({
					status: false,
					message: "No message specified",
				}),
				{
					status: 400,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
		} else if (message.length > 500) {
			return new Response(
				JSON.stringify({
					status: false,
					message: "Message is longer than 500 chars",
				}),
				{
					status: 400,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
		} else if (!title) {
			return new Response(
				JSON.stringify({
					status: false,
					message: "No title specified",
				}),
				{
					status: 400,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
		} else if (!type) {
			return new Response(
				JSON.stringify({
					status: false,
					message: "No type specified",
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

		await databases.createDocument(databaseId, collectionId, ID.unique(), {
			title,
			message,
			type,
			ends_at: expires_at,
		});

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

export default createNotice;

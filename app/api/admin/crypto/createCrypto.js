import { AppwriteServerClient } from "@/lib/client-server";
import CryptoSchema from "@/validators/newCryptoSchema";
import { NextResponse } from "next/server";
import { Databases, ID } from "node-appwrite";

export default async function createCrypto(request) {
	try {
		const data = await request.json();

		const parse = CryptoSchema.safeParse(data);

		if (!parse.success) {
			console.log(parse.error);
			return new Response(
				JSON.stringify({
					status: false,
					message: parse.error.errors[0].message,
				}),
				{
					status: 400,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
		}

		const app = new AppwriteServerClient();
		app.setKey();
		const server = app.getServer();

		const databases = new Databases(server);

		let databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
		let collectionId =
			process.env.NEXT_PUBLIC_APPRWRITE_CRYPTO_INFO_COLLECTION_ID;

		const doc = await databases.createDocument(
			databaseId,
			collectionId,
			ID.unique(),
			parse.data
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

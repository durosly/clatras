import { AppwriteServerClient } from "@/lib/client-server";
import { NextResponse } from "next/server";
import { Databases, ID } from "node-appwrite";

export default async function createVerificationAccount(request) {
	try {
		const { name, abbr, fee } = await request.json();

		if (!name) {
			return new Response(
				JSON.stringify({
					status: false,
					message: "Name cannot be empty",
				}),
				{
					status: 400,
					headers: { "Content-Type": `application/json` },
				}
			);
		} else if (!abbr) {
			return new Response(
				JSON.stringify({
					status: false,
					message: "Abbreviation cannot be empty",
				}),
				{
					status: 400,
					headers: { "Content-Type": `application/json` },
				}
			);
		} else if (!Number(fee)) {
			return new Response(
				JSON.stringify({
					status: false,
					message: "Fee must be a valid number",
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
			process.env
				.NEXT_PUBLIC_APPRWRITE_VERIFICATION_ACCOUNT_COLLECTION_ID;

		const doc = await databases.createDocument(
			databaseId,
			collectionId,
			ID.unique(),
			{
				name,
				abbr,
				fee,
			}
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

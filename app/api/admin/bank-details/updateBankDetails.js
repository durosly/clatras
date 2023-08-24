import { AppwriteServerClient } from "@/lib/client-server";
import { NextResponse } from "next/server";
import { Databases } from "node-appwrite";

export default async function updateBankDetails(request) {
	try {
		const data = await request.json();

		const { bank_name, account_name, account_number } = data;

		if (!bank_name) {
			return new Response(
				JSON.stringify({
					status: false,
					message: "bank name cannot be empty",
				}),
				{
					status: 400,
					headers: { "Content-Type": `application/json` },
				}
			);
		} else if (!account_name) {
			return new Response(
				JSON.stringify({
					status: false,
					message: "account name cannot be empty",
				}),
				{
					status: 400,
					headers: { "Content-Type": `application/json` },
				}
			);
		} else if (!Number(account_number)) {
			return new Response(
				JSON.stringify({
					status: false,
					message: "account number must be a valid number",
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
			process.env.NEXT_PUBLIC_APPRWRITE_BANK_DETAILS_COLLECTION_ID;

		const doc = await databases.updateDocument(
			databaseId,
			collectionId,
			data.$id,
			{ bank_name, account_name, account_number }
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

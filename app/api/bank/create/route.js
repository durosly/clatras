import clientServer from "@/lib/client-server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Databases, ID, Query } from "node-appwrite";

async function setBankDetails(request) {
	try {
		const { bank_name, account_name, account_number } =
			await request.json();
		const cookieStore = cookies();
		const cookie = cookieStore.get(process.env.NEXT_PUBLIC_COOKIE_AUTH_KEY);
		// console.log("server", cookie);
		if (!cookie?.value) {
			throw new Error("Invalid access");
		}

		if (!bank_name) {
			throw new Error("Please enter your Bank Name");
		} else if (!account_name) {
			throw new Error("Please enter Account Holder name");
		} else if (!account_name) {
			throw new Error("Please Enter Your Account Number");
		}

		clientServer.setKey(process.env.APPWRITE_API_KEY);

		const databases = new Databases(clientServer);

		let databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
		let collectionId =
			process.env.NEXT_PUBLIC_APPRWRITE_BANK_DETAILS_COLLECTION_ID;

		const existDoc = await databases.listDocuments(
			databaseId,
			collectionId,
			[Query.equal("userId", cookie.value), Query.limit(1)]
		);

		if (existDoc.total) {
			await databases.updateDocument(
				databaseId,
				collectionId,
				existDoc.documents[0].$id,
				{
					userId: cookie.value,
					bank_name,
					account_name,
					account_number,
				}
			);
		} else {
			const doc = await databases.createDocument(
				databaseId,
				collectionId,
				ID.unique(),
				{
					userId: cookie.value,
					bank_name,
					account_name,
					account_number,
				}
			);
		}

		return NextResponse.json({
			status: true,
			message: "successful",
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

export { setBankDetails as POST };

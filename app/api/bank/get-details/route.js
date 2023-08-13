import clientServer from "@/lib/client-server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Databases, Query } from "node-appwrite";

async function getBankDetails() {
	try {
		const cookieStore = cookies();
		const cookie = cookieStore.get(process.env.NEXT_PUBLIC_COOKIE_AUTH_KEY);
		// console.log("server", cookie);
		if (!cookie?.value) {
			throw new Error("Invalid access");
		}

		clientServer.setKey(process.env.APPWRITE_API_KEY);

		const databases = new Databases(clientServer);

		let databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
		let collectionId =
			process.env.NEXT_PUBLIC_APPRWRITE_BANK_DETAILS_COLLECTION_ID;

		const doc = await databases.listDocuments(databaseId, collectionId, [
			Query.equal("userId", cookie.value),
			Query.limit(1),
		]);

		if (!doc.total) {
			return new Response(
				JSON.stringify({
					status: false,
					message: "No account created yet",
				}),
				{
					status: 404,
					headers: { "Content-Type": `application/json` },
				}
			);
		}

		return NextResponse.json({
			status: true,
			message: "successfully",
			doc: doc.documents[0],
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

export { getBankDetails as GET };

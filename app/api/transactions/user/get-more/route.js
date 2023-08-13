import clientServer from "@/lib/client-server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Databases, Query } from "node-appwrite";

async function getNextTransactions(request) {
	try {
		const { searchParams } = new URL(request.url);
		const lastId = searchParams.get("lastId");
		const cookieStore = cookies();
		const cookie = cookieStore.get(process.env.NEXT_PUBLIC_COOKIE_AUTH_KEY);
		if (!cookie?.value) {
			throw new Error("Invalid access");
		}

		if (!lastId) throw new Error("No ID specified");

		clientServer.setKey(process.env.APPWRITE_API_KEY);

		const databases = new Databases(clientServer);

		let databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
		let collectionId =
			process.env.NEXT_PUBLIC_APPRWRITE_TRANSACTION_COLLECTION_ID;

		const doc = await databases.listDocuments(databaseId, collectionId, [
			Query.equal("userId", cookie.value),
			Query.limit(5),
			Query.orderDesc("$createdAt"),
			Query.cursorAfter(lastId),
		]);

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

export { getNextTransactions as GET };

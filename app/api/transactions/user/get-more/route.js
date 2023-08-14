import { AppwriteServerClient } from "@/lib/client-server";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Databases, Query } from "node-appwrite";
import { authOptions } from "@/auth/options";

async function getNextTransactions(request) {
	try {
		const session = await getServerSession(authOptions);
		const userId = session.user.userId;

		const { searchParams } = new URL(request.url);
		const lastId = searchParams.get("lastId");
		const token = searchParams.get("token");

		if (!lastId) throw new Error("No ID specified");
		if (!token) throw new Error("Token error");

		const app = new AppwriteServerClient();
		app.setToken(token);
		const server = app.getServer();

		const databases = new Databases(server);

		let databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
		let collectionId =
			process.env.NEXT_PUBLIC_APPRWRITE_TRANSACTION_COLLECTION_ID;

		const doc = await databases.listDocuments(databaseId, collectionId, [
			Query.equal("userId", userId),
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

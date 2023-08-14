import { AppwriteServerClient } from "@/lib/client-server";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Databases, Query } from "node-appwrite";
import { authOptions } from "@/auth/options";

async function getBankDetails(request) {
	try {
		const session = await getServerSession(authOptions);
		const userId = session.user.userId;

		const { searchParams } = new URL(request.url);
		const token = searchParams.get("token");
		if (!token) {
			throw new Error("Token error");
		}
		const app = new AppwriteServerClient();
		app.setToken(token);
		const server = app.getServer();

		const databases = new Databases(server);

		let databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
		let collectionId =
			process.env.NEXT_PUBLIC_APPRWRITE_BANK_DETAILS_COLLECTION_ID;

		const doc = await databases.listDocuments(databaseId, collectionId, [
			Query.equal("userId", userId),
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

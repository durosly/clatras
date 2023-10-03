import { authOptions } from "@/auth/options";
import { AppwriteServerClient } from "@/lib/client-server";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Databases, ID, Query } from "node-appwrite";
export const dynamic = "force-dynamic";
async function setBankDetails(request) {
	try {
		const session = await getServerSession(authOptions);
		const userId = session.user.userId;

		const { bank_name, account_name, account_number, token } =
			await request.json();

		if (!token) {
			throw new Error("Token error");
		}

		if (!bank_name) {
			throw new Error("Please enter your Bank Name");
		} else if (!account_name) {
			throw new Error("Please enter Account Holder name");
		} else if (!account_name) {
			throw new Error("Please Enter Your Account Number");
		}
		const app = new AppwriteServerClient();
		app.setToken(token);
		const server = app.getServer();

		const databases = new Databases(server);

		let databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
		let collectionId =
			process.env.NEXT_PUBLIC_APPRWRITE_BANK_DETAILS_COLLECTION_ID;

		const existDoc = await databases.listDocuments(
			databaseId,
			collectionId,
			[Query.equal("userId", userId), Query.limit(1)]
		);

		if (existDoc.total) {
			await databases.updateDocument(
				databaseId,
				collectionId,
				existDoc.documents[0].$id,
				{
					userId,
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
					userId,
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

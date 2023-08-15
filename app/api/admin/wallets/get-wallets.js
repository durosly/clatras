import { AppwriteServerClient } from "@/lib/client-server";
import { NextResponse } from "next/server";
import { Databases, Query } from "node-appwrite";

async function getWallets(request) {
	try {
		const { searchParams } = new URL(request.url);
		const type = searchParams.get("type");
		const app = new AppwriteServerClient();
		app.setKey();
		const server = app.getServer();
		const database = new Databases(server);
		let database_id = "";
		let collection_id = "";

		database_id = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
		if (type === "btc" || type === "pi") {
			collection_id =
				process.env.NEXT_PUBLIC_APPRWRITE_CRYPTO_INFO_COLLECTION_ID;
		} else if (type === "cashapp" || type === "zelle") {
			collection_id =
				process.env
					.NEXT_PUBLIC_APPRWRITE_EXCHANGE_ACCOUNT_INFO_COLLECTION_ID;
		}

		const docs = await database.listDocuments(database_id, collection_id, [
			Query.equal("abbr", type),
		]);

		return NextResponse.json({
			status: true,
			message: "successfully",
			doc: docs.documents[0],
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

export default getWallets;

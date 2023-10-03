import { NextResponse } from "next/server";
import CoinMarketCap from "coinmarketcap-api";
import { Databases, Query } from "node-appwrite";
import { AppwriteServerClient } from "@/lib/client-server";
export const dynamic = "force-dynamic";
export async function GET() {
	const app = new AppwriteServerClient();
	app.setKey();
	const server = app.getServer();

	const databases = new Databases(server);

	let databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
	let collectionId =
		process.env.NEXT_PUBLIC_APPRWRITE_CRYPTO_INFO_COLLECTION_ID;

	const docs = await databases.listDocuments(databaseId, collectionId, [
		Query.equal("type", "predefined"),
	]);

	for (const doc of docs.documents) {
		const client = new CoinMarketCap(process.env.COINMARKETCAP_API);
		const c_data = await client.getQuotes({
			symbol: doc.abbr.toUpperCase(),
		});

		if (!c_data?.status.error_code) {
			await databases.updateDocument(databaseId, collectionId, doc.$id, {
				rate: c_data.data[doc.abbr.toUpperCase()].quote.USD.price,
			});
		}
	}

	return NextResponse.json({ ok: true });
}

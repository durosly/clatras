import { AppwriteServerClient } from "@/lib/client-server";
import { NextResponse } from "next/server";
import { Databases } from "node-appwrite";

async function updateWallets(request) {
	try {
		const { searchParams } = new URL(request.url);
		const type = searchParams.get("type");
		const app = new AppwriteServerClient();
		app.setKey();
		const server = app.getServer();
		const database = new Databases(server);
		let database_id = "";
		let collection_id = "";

		const { id, rate, address, network, email, tag, phone, fee } =
			await request.json();
		let update = {};

		database_id = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
		if (type === "btc" || type === "pi") {
			collection_id =
				process.env.NEXT_PUBLIC_APPRWRITE_CRYPTO_INFO_COLLECTION_ID;
			update.info = {
				rate,
				address,
				network: network ?? null,
			};
		} else if (type === "cashapp" || type === "zelle") {
			collection_id =
				process.env
					.NEXT_PUBLIC_APPRWRITE_EXCHANGE_ACCOUNT_INFO_COLLECTION_ID;

			update.info = {
				email,
				tag,
				phone,
				fee,
			};
		}

		await database.updateDocument(
			database_id,
			collection_id,
			id,
			update.info
		);

		return NextResponse.json({
			status: true,
			message: "successfully",
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

export default updateWallets;

import clientServer from "@/lib/client-server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Databases, ID } from "node-appwrite";

async function createNewTransaction(request) {
	try {
		const cookieStore = cookies();
		const cookie = cookieStore.get(process.env.NEXT_PUBLIC_COOKIE_AUTH_KEY);
		// console.log("server", cookie);
		if (!cookie?.value) {
			throw new Error("Invalid access");
		}

		const { type, doc_id, amt } = await request.json();
		// console.log(res);

		if (!type || !doc_id || !amt) {
			throw new Error("Enter all fields");
		}

		clientServer.setKey(process.env.APPWRITE_API_KEY);

		const databases = new Databases(clientServer);

		let databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
		let collectionId = null;

		if (type === "crypto") {
			collectionId =
				process.env.NEXT_PUBLIC_APPRWRITE_CRYPTO_INFO_COLLECTION_ID;
		}

		const doc = await databases.getDocument(
			databaseId,
			collectionId,
			doc_id
		);

		let description = "Exchange";
		let address = "nil";
		let item_name = doc.name;
		let rate = 1;
		let returns = 1;

		if (type === "crypto") {
			description += `: ${doc.name}`;
			address = doc.address;
			rate = doc.rate;

			returns = amt * doc.rate;
		}

		const data = {
			userId: cookie.value,
			description,
			type,
			address,
			item_name,
			amount: Number(amt),
			rate,
			returns,
			status: "pending",
		};

		await databases.createDocument(
			databaseId,
			process.env.NEXT_PUBLIC_APPRWRITE_TRANSACTION_COLLECTION_ID,
			ID.unique(),
			data
		);

		return NextResponse.json({
			status: true,
			message: "Transaction created successfully",
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

export { createNewTransaction as POST };

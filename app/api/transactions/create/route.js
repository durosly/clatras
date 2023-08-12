import clientServer from "@/lib/client-server";
import { calculateReturns } from "@/lib/utils";
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
		} else if (type === "account") {
			collectionId =
				process.env
					.NEXT_PUBLIC_APPRWRITE_EXCHANGE_ACCOUNT_INFO_COLLECTION_ID;
		} else if (type === "g-voice") {
			collectionId =
				process.env.NEXT_PUBLIC_APPRWRITE_G_VOICE_COLLECTION_ID;
		}

		const doc = await databases.getDocument(
			databaseId,
			collectionId,
			doc_id
		);

		let description = "";
		let address = "nil";
		let item_name = doc.name;
		let rate = 1;
		let returns = 1;
		let email = "support@clatras.com";
		let tag = "";
		let phonenumber = "";

		if (type === "crypto") {
			description = `Exchange: ${doc.name} ${doc?.network || ""}`;
			address = doc.address;
			rate = doc.rate;

			returns = calculateReturns(type, amt, doc.rate);
		} else if (type === "account") {
			description = `Sent funds to ${doc.name}`;
			email = doc?.email || "support@clatras.com";
			tag = doc?.tag || "";
			phonenumber = doc?.phone || "";
			rate = doc.fee;
			returns = calculateReturns(type, amt, doc.fee);
		} else if (type === "g-voice") {
			description = `Purchase google voice accounts`;
			rate = doc.cost;
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
			email,
			tag,
			phonenumber,
		};

		if (type === "g-voice") {
			data.account_name = doc.account_name;
			data.account_bank = doc.bank_name;

			data.account_number = doc.account_number;
		}

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

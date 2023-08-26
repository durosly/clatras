import clientServer, { AppwriteServerClient } from "@/lib/client-server";
import { calculateReturns } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Databases, ID, Query } from "node-appwrite";
import { authOptions } from "@/auth/options";

async function createNewTransaction(request) {
	try {
		const session = await getServerSession(authOptions);

		const resData = await request.json();

		const { type, doc_id, amt, user_jwt } = resData;

		if (!user_jwt) {
			throw new Error("token error");
		}

		if (!type || !doc_id || !amt) {
			throw new Error("Enter all fields");
		}

		const app = new AppwriteServerClient();
		app.setToken(user_jwt);

		const server = app.getServer();

		const databases = new Databases(server);
		const userId = session.user.userId;

		let databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
		let collectionId = null;

		if (type === "crypto") {
			collectionId =
				process.env.NEXT_PUBLIC_APPRWRITE_CRYPTO_INFO_COLLECTION_ID;
		} else if (type === "payment") {
			collectionId =
				process.env
					.NEXT_PUBLIC_APPRWRITE_EXCHANGE_ACCOUNT_INFO_COLLECTION_ID;
		} else if (type === "verification") {
			collectionId =
				process.env
					.NEXT_PUBLIC_APPRWRITE_VERIFICATION_ACCOUNT_COLLECTION_ID;
		} else if (type === "gift-card") {
			collectionId =
				process.env.NEXT_PUBLIC_APPRWRITE_GIFTCARD_COLLECTION_ID;
		}

		console.log(resData);

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
		let market = "";

		if (type === "crypto") {
			description = `Exchange: ${doc.name} ${doc?.network || ""}`;
			address = doc.address;
			rate = doc.rate;

			returns = calculateReturns(type, amt, doc.rate);
		} else if (type === "payment") {
			description = `Sent funds to ${doc.name}`;

			rate = doc.fee;
			market = "sell";
		} else if (type === "verification") {
			description = `Purchase ${amt} ${doc.name}${amt > 1 && "s"}`;
			rate = doc.fee;
			market = "buy";
		} else if (type === "gift-card") {
			description = `Purchase giftcard`;
			rate = doc.fee;
			market = "buy";
		}

		const data = {
			userId,
			description,
			type,
			address,
			item_name,
			amount: Number(amt),
			rate,
			returns,
			status: "pending",
			market,
		};

		if (type === "gift-card" || type === "verification") {
			const { bankId } = resData;

			const doc = await databases.getDocument(
				databaseId,
				process.env.NEXT_PUBLIC_APPRWRITE_BANK_DETAILS_COLLECTION_ID,
				bankId,
				[Query.equal("userId", "admin")]
			);
			data.account_name = doc.account_name;
			data.account_bank = doc.bank_name;

			data.account_number = doc.account_number;
			if (market === "buy") {
				data.sending = rate * amt;
			}
		} else if (type === "payment") {
			const { bankId } = resData;
			const doc = await databases.getDocument(
				databaseId,
				process.env.NEXT_PUBLIC_APPRWRITE_BANK_DETAILS_COLLECTION_ID,
				bankId,
				[Query.equal("userId", userId)]
			);
			data.account_name = doc.account_name;
			data.account_bank = doc.bank_name;

			data.account_number = doc.account_number;
			if (market === "sell") {
				data.returns = rate * amt;
			}
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

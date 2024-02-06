import { AppwriteServerClient } from "@/lib/client-server";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Databases, ID, Query } from "node-appwrite";
import { authOptions } from "@/auth/options";
import sendEmail from "@/lib/send-email";
import convertObjToMessage from "@/lib/serialize-to-message";
export const dynamic = "force-dynamic";
async function createNewTransaction(request) {
	try {
		const session = await getServerSession(authOptions);

		const resData = await request.json();

		const {
			doc_id,
			amt,
			user_jwt,
			market,
			wallet: userAddress,
			network: userNetwork,
		} = resData;

		if (!user_jwt) {
			throw new Error("token error");
		}

		if (!doc_id || !amt) {
			throw new Error("Enter all fields");
		}

		if (market === "buy" && !userAddress) {
			throw new Error("Enter wallet address");
		}

		if (!Number(amt)) {
			throw new Error("Invalid amount");
		}

		const app = new AppwriteServerClient();
		app.setToken(user_jwt);

		const server = app.getServer();

		const databases = new Databases(server);
		const userId = session.user.userId;

		const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
		const collectionId =
			process.env.NEXT_PUBLIC_APPRWRITE_CRYPTO_INFO_COLLECTION_ID;

		const doc = await databases.getDocument(
			databaseId,
			collectionId,
			doc_id
		);

		if (!doc) {
			throw new Error("Token not found");
		}

		if (market === "sell" && doc?.min_sell_purchase) {
			if (amt < doc.min_sell_purchase)
				throw new Error(
					`Minimum sell purchase is ${doc.min_sell_purchase}`
				);
		} else if (market === "buy" && doc?.min_buy_purchase) {
			if (amt < doc.min_buy_purchase)
				throw new Error(
					`Minimum buy purchase is ${doc.min_buy_purchase} `
				);
		}

		const d_rate = await databases.listDocuments(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
			process.env.NEXT_PUBLIC_APPRWRITE_DOLLAR_RATE_COLLECTION_ID,
			[Query.equal("market", market)]
		);

		let description = "";
		let item_name = doc.name;
		let dollar_rate = d_rate.total > 0 ? d_rate.documents[0].rate : 1;
		let rate = 1;
		let returns = 1;

		if (market === "sell") {
			description = `Exchange: ${doc.name} ${doc?.network || ""}`;
		} else {
			description = `Purchase: ${doc.name} ${userNetwork || ""}`;
		}

		rate = doc.rate;

		returns = dollar_rate * amt;

		const data = {
			userId,
			description,
			type: "crypto",
			address: market === "sell" ? doc.address : userAddress,
			item_name,
			amount: Number(amt),
			rate,
			returns,
			status: "pending",
			market,
			dollar_rate,
		};

		const { bankId } = resData;
		if (!bankId) {
			if (market === "sell") {
				throw new Error("Specify your bank details");
			} else {
				throw new Error("Select details you used for transaction");
			}
		}

		const u_doc = await databases.getDocument(
			databaseId,
			process.env.NEXT_PUBLIC_APPRWRITE_BANK_DETAILS_COLLECTION_ID,
			bankId
		);
		data.account_name = u_doc.account_name;
		data.account_bank = u_doc.bank_name;
		data.account_number = u_doc.account_number;

		data.sending = amt / rate;

		// get admin notification email

		const docEmail = await databases.listDocuments(
			databaseId,
			process.env
				.NEXT_PUBLIC_APPRWRITE_ADMIN_EMAIL_NOTIFICATION_COLLECTION_ID,
			[Query.limit(1)]
		);

		const current = docEmail.total > 0 ? docEmail.documents[0].email : "";
		await databases.createDocument(
			databaseId,
			process.env.NEXT_PUBLIC_APPRWRITE_TRANSACTION_COLLECTION_ID,
			ID.unique(),
			data
		);

		const userEmail = convertObjToMessage(data, "user");
		await sendEmail(
			session.user.email,
			"⌛Pending transaction",
			"Transaction is being processed.",
			userEmail,
			"Thank you for choosing Clatras"
		);

		const adminEmail = convertObjToMessage(data, "admin");
		await sendEmail(
			current,
			"📌New Pending transaction",
			"New transaction request",
			adminEmail,
			"Pending transaction"
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

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

		const { type, doc_id, amt, user_jwt } = resData;

		if (!user_jwt) {
			throw new Error("token error");
		}

		if (!type || !doc_id || !amt) {
			throw new Error("Enter all fields");
		}

		if (!Number(amt)) {
			throw new Error("Invalid amount");
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

		const doc = await databases.getDocument(
			databaseId,
			collectionId,
			doc_id
		);

		const d_rate = await databases.listDocuments(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
			process.env.NEXT_PUBLIC_APPRWRITE_DOLLAR_RATE_COLLECTION_ID
		);

		let description = "";
		let address = "nil";
		let item_name = doc.name;
		let dollar_rate = d_rate.total > 0 ? d_rate.documents[0].rate : 1;
		let rate = 1;
		let returns = 1;
		let market = "";

		if (d_rate.total > 0) {
			dollar_rate = d_rate.documents[0].rate;
		}

		if (type === "crypto") {
			description = `Exchange: ${doc.name} ${doc?.network || ""}`;
			address = doc.address;
			rate = doc.rate;

			returns = dollar_rate * amt;
			market = "sell";
		} else if (type === "payment") {
			description = `Sent funds to ${doc.name}`;

			rate = doc.fee;
			market = "sell";
			returns = amt * doc.fee;
			dollar_rate = rate;
		} else if (type === "verification") {
			description = `Purchase ${amt} ${doc.name}`;
			rate = doc.fee;
			market = "buy";
		} else if (type === "gift-card") {
			description = `Purchase ${doc.name} giftcard`;
			rate = doc.fee;
			market = "buy";
			dollar_rate = rate;
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
			dollar_rate,
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
		} else if (type === "payment" || type === "crypto") {
			const { bankId } = resData;
			const u_doc = await databases.getDocument(
				databaseId,
				process.env.NEXT_PUBLIC_APPRWRITE_BANK_DETAILS_COLLECTION_ID,
				bankId,
				[Query.equal("userId", userId)]
			);
			data.account_name = u_doc.account_name;
			data.account_bank = u_doc.bank_name;
			data.account_number = u_doc.account_number;

			if (type === "crypto") {
				data.sending = amt / rate;
			} else if (type === "payment") {
				data.sending = amt;
				data.email = doc?.email || "nil";
				data.tag = doc?.tag || "nil";
				data.phone = doc?.phone || "nil";
			}
		}

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

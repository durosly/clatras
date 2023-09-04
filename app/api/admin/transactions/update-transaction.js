import { AppwriteServerClient } from "@/lib/client-server";
import sendEmail from "@/lib/send-email";
import { NextResponse } from "next/server";
import { Databases, Users } from "node-appwrite";

async function updateTransactionStatus(request) {
	try {
		const { status, id } = await request.json();
		if (status !== "success" && status !== "declined") {
			return new Response(
				JSON.stringify({
					status: false,
					message: "Invalid status entry",
				}),
				{
					status: 401,
					headers: { "Content-Type": `application/json` },
				}
			);
		}

		if (!id) {
			return new Response(
				JSON.stringify({
					status: false,
					message: "No document selected",
				}),
				{
					status: 401,
					headers: { "Content-Type": `application/json` },
				}
			);
		}

		const app = new AppwriteServerClient();
		app.setKey();
		const server = app.getServer();

		const databases = new Databases(server);

		let databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
		let collectionId =
			process.env.NEXT_PUBLIC_APPRWRITE_TRANSACTION_COLLECTION_ID;

		await databases.updateDocument(databaseId, collectionId, id, {
			status,
		});

		const doc = await databases.getDocument(databaseId, collectionId, id);

		const users = new Users(server);

		const user = await users.get(doc.userId);

		const title =
			status === "success"
				? "✅Transaction successful"
				: "⚠️Transaction declined";
		const message =
			status === "success"
				? `Your transaction for ${doc.item_name} has been approved. `
				: `Your transaction for ${doc.item_name} has been declined. Please, contact admin to learn more.`;

		await sendEmail(
			user.email,
			title,
			message,
			"",
			"Thank you for choosing Clatras"
		);

		return NextResponse.json({ status: true, message: "Status updated" });
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

export default updateTransactionStatus;

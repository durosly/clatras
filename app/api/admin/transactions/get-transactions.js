import { AppwriteServerClient } from "@/lib/client-server";
import { NextResponse } from "next/server";
import { Databases, Query, Users } from "node-appwrite";

function formatDate(date) {
	const isoDate = new Date(date).toISOString();
	const startOfDay = isoDate.substring(0, 10) + "T00:00:00.000+00:00";
	const endOfDay = isoDate.substring(0, 10) + "T23:59:59.999+00:00";

	return { startOfDay, endOfDay };
}

export default async function getTransactions(request) {
	try {
		const { searchParams } = new URL(request.url);
		const lastId = searchParams.get("lastId");

		const status = searchParams.get("status");
		const date = searchParams.get("date");

		const queries = [Query.limit(5), Query.orderDesc("$createdAt")];
		if (lastId) queries.push(Query.cursorAfter(lastId));

		if (status) queries.push(Query.equal("status", status));

		if (date) {
			// convert date to ISO with the time starting at 12:00am
			// convert date to ISO

			const { startOfDay, endOfDay } = formatDate(date);
			queries.push(Query.greaterThanEqual("$createdAt", startOfDay));
			queries.push(Query.lessThanEqual("$createdAt", endOfDay));
		}

		const app = new AppwriteServerClient();
		app.setKey();
		const server = app.getServer();

		const databases = new Databases(server);

		let databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
		let collectionId =
			process.env.NEXT_PUBLIC_APPRWRITE_TRANSACTION_COLLECTION_ID;

		const doc = await databases.listDocuments(
			databaseId,
			collectionId,
			queries
		);

		const data = [];

		for (const item of doc.documents) {
			if (item.type === "crypto" || item.type === "payment") {
				const account = await databases.listDocuments(
					databaseId,
					process.env
						.NEXT_PUBLIC_APPRWRITE_BANK_DETAILS_COLLECTION_ID,
					[Query.equal("userId", item.userId)]
				);

				item.user = { account: account.documents[0] };
				if (item.type === "payment") {
					const users = new Users(server);
					const user = await users.get(item.userId);
					item.user = {
						...item.user,
						name: user.name,
						email: user.email,
					};
				}
			} else if (
				item.type === "gift-card" ||
				item.type === "verification"
			) {
				const users = new Users(server);
				const user = await users.get(item.userId);
				item.user = { name: user.name, email: user.email };
			}

			data.push(item);
		}

		return NextResponse.json({
			status: true,
			message: "successfully",
			doc: data,
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

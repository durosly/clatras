import { AppwriteServerClient } from "@/lib/client-server";
import { NextResponse } from "next/server";
import { Databases, Query, Users } from "node-appwrite";

function formatDate(date) {
	const isoDate = new Date(date).toISOString();
	const startOfDay = isoDate.substring(0, 10) + "T00:00:00.000+00:00";
	const endOfDay = isoDate.substring(0, 10) + "T23:59:59.999+00:00";

	return { startOfDay, endOfDay };
}

function calculateStartDate(interval) {
	const currentDate = new Date();

	if (interval === "1m") {
		// Subtract one month from the current date
		currentDate.setMonth(currentDate.getMonth() - 1);
	} else if (interval === "1w") {
		// Subtract one week from the current date
		currentDate.setDate(currentDate.getDate() - 7);
	} else if (interval === "3d") {
		// Subtract three days from the current date
		currentDate.setDate(currentDate.getDate() - 3);
	} else if (interval === "24h") {
		// Subtract 24 hours from the current date
		currentDate.setHours(currentDate.getHours() - 24);
	}

	const { startOfDay } = formatDate(currentDate);
	const { endOfDay } = formatDate(new Date());

	return { startOfDay, endOfDay };
}

async function getTransactions(request) {
	try {
		const { searchParams } = new URL(request.url);
		const interval = searchParams.get("interval"); // 1m, 1w, 3d, 24h

		const queries = [Query.equal("status", "success")];

		if (!interval) {
			return new Response(
				JSON.stringify({
					status: false,
					message: "Select an interval",
				}),
				{
					status: 400,
					headers: { "Content-Type": `application/json` },
				}
			);
		}
		const { startOfDay, endOfDay } = calculateStartDate(interval);
		queries.push(Query.greaterThanEqual("$createdAt", startOfDay));
		queries.push(Query.lessThanEqual("$createdAt", endOfDay));

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

		const data = {
			total: { count: 0, bal: 0 },
			items: {},
			btc: { per: 0, count: 0, bal: 0 },
			pi: { per: 0, count: 0, bal: 0 },
			cashapp: { per: 0, count: 0, bal: 0 },
			zelle: { per: 0, count: 0, bal: 0 },
			google: { per: 0, count: 0, bal: 0 },
		};

		for (const item of doc.documents) {
			let key = item.item_name;
			data.total.count++;
			data.total.bal += Number(item.rate) * Number(item.amount);

			if (data.items[key]) {
				data.items[key].count++;
				data.items[key].bal += Number(item.rate) * Number(item.amount);
				// console.log(data.items);
			} else {
				data.items[key] = {
					count: 1,
					bal: Number(item.rate) * Number(item.amount),
				};
				// data.items[key].count = 1;
				// data.items[key].bal = Number(item.rate) * Number(item.amount);
			}

			// data[key].count++;
			// data[key].bal += Number(item.rate) * Number(item.amount);

			for (const k in data.items) {
				data.items[k].per = (data.items[k].bal / data.total.bal) * 100;
			}
		}

		return NextResponse.json({
			status: true,
			message: "successfully",
			data,
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

export { getTransactions as GET };

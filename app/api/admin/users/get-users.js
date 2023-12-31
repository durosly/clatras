import { AppwriteServerClient } from "@/lib/client-server";
import { NextResponse } from "next/server";
import { Query, Users } from "node-appwrite";

export default async function getUsers(request) {
	try {
		const { searchParams } = new URL(request.url);
		const lastId = searchParams.get("lastId");

		const query = searchParams.get("query");

		const queries = [Query.limit(5), Query.orderDesc("$createdAt")];
		if (lastId) queries.push(Query.cursorAfter(lastId));

		const app = new AppwriteServerClient();
		app.setKey();
		const server = app.getServer();

		const users = new Users(server);

		let doc;

		if (query) {
			doc = await users.list(queries, query);
		} else {
			doc = await users.list(queries);
		}

		return NextResponse.json({
			status: true,
			message: "successfully",
			doc: doc.users,
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

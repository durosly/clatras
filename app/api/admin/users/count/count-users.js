import { AppwriteServerClient } from "@/lib/client-server";
import { NextResponse } from "next/server";
import { Users } from "node-appwrite";

export default async function getUsersCount() {
	try {
		const app = new AppwriteServerClient();
		app.setKey();
		const server = app.getServer();

		const users = new Users(server);

		const doc = await users.list();

		return NextResponse.json({
			status: true,
			message: "successfully",
			total: doc.total,
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

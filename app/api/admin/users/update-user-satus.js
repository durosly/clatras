import { AppwriteServerClient } from "@/lib/client-server";
import { NextResponse } from "next/server";
import { Users } from "node-appwrite";

async function updateUserStatus(request) {
	try {
		const { status, id } = await request.json();
		if (status !== true && status !== false) {
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

		const users = new Users(server);

		await users.updateStatus(id, status);

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

export default updateUserStatus;

import { NextResponse } from "next/server";
import client from "@/lib/client";
import { Account, ID } from "appwrite";

export async function GET(request) {
	const account = new Account(client);

	account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
		(response) => {
			console.log(response);
		},
		(error) => {
			console.log(error);
		}
	);

	return NextResponse.json({ satus: true });
}

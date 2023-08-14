import clientServer from "@/lib/client-server";
import UserSchema from "@/validators/signupSchema";
import { NextResponse } from "next/server";
import { phone } from "phone";
import { AppwriteException, Users, ID } from "node-appwrite";

export async function POST(request) {
	try {
		const res = await request.json();

		const parse = UserSchema.safeParse(res);

		if (!parse.success) {
			return new Response(
				JSON.stringify({
					status: false,
					message: parse.error.errors[0].message,
				}),
				{
					status: 400,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
		}

		const {
			data: { firstname, lastname, email, password, phonenumber },
		} = parse;

		const pValid = phone(phonenumber, { country: "NG" });

		if (!pValid.isValid) {
			return new Response(
				JSON.stringify({
					status: false,
					message: "Invalid phonenumber or number is foreign",
				}),
				{
					status: 400,
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
		}

		clientServer.setKey(process.env.APPWRITE_API_KEY);

		const users = new Users(clientServer);

		const response = await users.create(
			ID.unique(),
			email,
			pValid.phoneNumber,
			password,
			`${firstname} ${lastname}`
		);

		await users.updatePrefs(response.$id, { isAdmin: false });

		return NextResponse.json({
			status: true,
			message: "signup successful. Login to continue",
		});
	} catch (error) {
		let message = "Something went wrong";
		let code = 500;
		// console.log(error.message);
		if (error instanceof AppwriteException) {
			message = error.response.message;
			code = error.code;
		}

		return new Response(
			JSON.stringify({
				status: false,
				message,
			}),
			{
				status: code,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	}
}

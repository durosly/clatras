"use client";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
// import { Client, Account } from "appwrite";

function LogoutButton() {
	// const client = new Client();

	// client
	// 	.setEndpoint(process.env.NEXT_PUBLIC_APPRWRITE_ENDPOINT)
	// 	.setProject(process.env.NEXT_PUBLIC_APPRWRITE_PROJECT_ID);

	// const account = new Account(client);

	const router = useRouter();
	async function handleLogout() {
		// await account.deleteSessions("current");
		deleteCookie(process.env.NEXT_PUBLIC_COOKIE_AUTH_KEY, {
			path: "/user",
			domain: "localhost",
		});
		router.push("/login");
	}

	return <a onClick={handleLogout}>Logout</a>;
}

export default LogoutButton;

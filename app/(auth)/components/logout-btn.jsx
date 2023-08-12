"use client";
import { deleteCookie } from "cookies-next";
import { appwriteClient } from "@/lib/client";
import { useRouter } from "next/navigation";

function LogoutButton() {
	const router = useRouter();
	async function handleLogout() {
		await appwriteClient.logoutCurrent();
		deleteCookie(process.env.NEXT_PUBLIC_COOKIE_AUTH_KEY, {
			path: "/user",
			domain: "localhost",
		});
		router.push("/login");
	}

	return <a onClick={handleLogout}>Logout</a>;
}

export default LogoutButton;

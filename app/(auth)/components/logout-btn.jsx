"use client";
import { appwriteClient } from "@/lib/client";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

function LogoutButton() {
	const router = useRouter();
	async function handleLogout() {
		await appwriteClient.logoutCurrent();
		const data = await signOut({ redirect: false, callbackUrl: "/login" });
		router.push(data.url);
	}

	return <a onClick={handleLogout}>Logout</a>;
}

export default LogoutButton;

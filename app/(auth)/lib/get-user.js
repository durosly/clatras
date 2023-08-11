import { cookies } from "next/headers";

async function getActiveUser() {
	try {
		const cookieStore = cookies();
		const userId = cookieStore.get(process.env.NEXT_PUBLIC_COOKIE_AUTH_KEY);

		if (userId) {
			return userId;
		}

		throw new Error("No session found");
	} catch (error) {
		// console.log("error", error);
		return null;
	}
}

export default getActiveUser;

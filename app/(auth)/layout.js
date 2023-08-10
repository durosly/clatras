import { redirect } from "next/navigation";
import Wrapper from "./components/wrapper";
import getActiveUser from "./lib/get-user";

export default async function AuthLayout({ children }) {
	let user = await getActiveUser();

	if (!user) {
		redirect("/login");
	}

	return <Wrapper>{children}</Wrapper>;
}

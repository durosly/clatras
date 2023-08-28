import PasswordUpdate from "@/app/(auth)/user/profile/components/password-update";
import { BsFillUnlockFill } from "react-icons/bs";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

function AdminPasswordChange() {
	return (
		<div>
			<div className="flex gap-2 items-center">
				<span className="w-8 aspect-square rounded-full flex justify-center items-center">
					<BsFillUnlockFill className="w-5 h-5" />
				</span>
				<h2 className="font-bold">Passwords</h2>
			</div>
			<PasswordUpdate />
		</div>
	);
}

export default AdminPasswordChange;

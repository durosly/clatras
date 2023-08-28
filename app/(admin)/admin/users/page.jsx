import { FiUsers } from "react-icons/fi";
import UsersListWrapper from "./users-list-wrapper";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

function AdminUsersPage() {
	return (
		<div>
			<div className="flex gap-2 items-center">
				<span className="w-8 aspect-square rounded-full flex justify-center items-center">
					<FiUsers className="w-5 h-5" />
				</span>
				<h2 className="font-bold">Users</h2>
			</div>
			<UsersListWrapper />
		</div>
	);
}

export default AdminUsersPage;

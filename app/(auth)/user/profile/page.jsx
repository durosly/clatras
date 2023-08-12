import { FaUser } from "react-icons/fa";
import ProfileDisplay from "./components/profile-display";
import PasswordUpdate from "./components/password-update";

function UserProfilePage() {
	return (
		<div className="mx-5 sm:mx-10 py-5 space-y-4">
			<ProfileDisplay />
			<PasswordUpdate />
		</div>
	);
}

export default UserProfilePage;

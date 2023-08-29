import ProfileDisplay from "./components/profile-display";
import PasswordUpdate from "./components/password-update";
import BankDetails from "./components/bank-details";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

function UserProfilePage() {
	return (
		<div className="mx-5 sm:mx-10 py-5 space-y-10">
			<ProfileDisplay />
			<BankDetails />
			<PasswordUpdate />
		</div>
	);
}

export default UserProfilePage;

import Link from "next/link";
import LogoutButton from "./logout-btn";

function Nav() {
	return (
		<>
			<li>
				<Link href="/user/profile">Profile</Link>
			</li>
			<li>
				<Link href="/user/transactions">History</Link>
			</li>
			<li>
				<LogoutButton>Logout</LogoutButton>
			</li>
		</>
	);
}

export default Nav;

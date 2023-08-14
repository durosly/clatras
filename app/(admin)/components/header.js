import LogoutButton from "@/app/(auth)/components/logout-btn";
import ProfileImgDisplay from "@/app/(auth)/user/profile/components/profile-img-display";
import Link from "next/link";
import { HiBars3CenterLeft } from "react-icons/hi2";

function Header() {
	return (
		<div className="navbar bg-base-100">
			<div className="navbar-start ">
				<div className="flex items-center lg:hidden">
					<label
						htmlFor="my-drawer-2"
						className="btn btn-ghost btn-square drawer-button "
					>
						<HiBars3CenterLeft className="w-6 h-6" />
					</label>
					<Link href="/admin">Clatras</Link>
				</div>
			</div>
			<div className="navbar-center">
				<a className="btn btn-ghost normal-case text-xl">Dashboard</a>
			</div>
			<div className="navbar-end">
				<div className="dropdown dropdown-end">
					<label
						tabIndex={0}
						className="btn btn-ghost btn-circle avatar"
					>
						<ProfileImgDisplay />
					</label>
					<ul
						tabIndex={0}
						className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
					>
						<li>
							<Link href="/admin/settings">Settings</Link>
						</li>
						<li>
							<LogoutButton>Logout</LogoutButton>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Header;

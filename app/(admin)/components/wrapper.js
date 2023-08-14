import logo from "@/images/logo.png";
import Image from "next/image";
// import Header from "./header";
// import Nav from "./nav";

import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import {
	HiOutlineBriefcase,
	HiOutlineClipboardList,
	HiOutlineViewGrid,
	HiUserGroup,
} from "react-icons/hi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import Header from "./header";
import LogoutButton from "@/app/(auth)/components/logout-btn";

function Wrapper({ children }) {
	return (
		<>
			<div className="drawer lg:drawer-open ">
				<input
					id="my-drawer-2"
					type="checkbox"
					className="drawer-toggle"
				/>
				<div className="drawer-content flex flex-col items-center justify-center">
					{/* Page content here */}
					<div className="flex-1 w-full">
						<Header />

						<main className="p-5">{children}</main>
					</div>
				</div>
				<div className="drawer-side">
					<label
						htmlFor="my-drawer-2"
						className="drawer-overlay"
					></label>
					<div className="bg-base-200 min-h-screen">
						<div className="p-5">
							<Link
								className="flex-1 flex items-center gap-1 px-2 mx-2"
								href="/user"
							>
								<div className="w-5 h-5 relative">
									<Image
										src={logo}
										alt=""
										placeholder="blur"
										fill
									/>
								</div>
								<p className="font-bold">Admin Console</p>
							</Link>
						</div>
						<ul className="menu p-4 w-80 h-full  text-base-content">
							{/* Sidebar content here */}
							<li>
								<Link href="/admin">
									<span>
										<HiOutlineViewGrid className="w-6 h-6 stroke-current" />
									</span>
									<span>Dashboard</span>
								</Link>
							</li>
							<li>
								<Link href="/admin/transactions">
									<span>
										<HiOutlineClipboardList className="w-6 h-6 stroke-current" />
									</span>
									<span>Transactions</span>
								</Link>
							</li>
							<li>
								<Link href="/admin/users">
									<span>
										<HiUserGroup className="w-6 h-6 stroke-current" />
									</span>
									<span>Users</span>
								</Link>
							</li>
							<li>
								<Link href="/admin/wallets">
									<span>
										<HiOutlineBriefcase className="w-6 h-6 stroke-current" />
									</span>
									<span>Wallets</span>
								</Link>
							</li>
							<li>
								<Link href="/admin/google-voice">
									<span>
										<AiOutlineGoogle className="w-6 h-6 stroke-current" />
									</span>
									<span>Google Voice</span>
								</Link>
							</li>
							<li>
								<LogoutButton className="link-error">
									<span>
										<RiLogoutCircleRLine className="w-6 h-6 stroke-current" />
									</span>
									<span>Logout</span>
								</LogoutButton>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div id="modal-container"></div>
		</>
	);
}

export default Wrapper;

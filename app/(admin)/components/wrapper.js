import logo from "@/images/logo.png";
import Image from "next/image";

import LogoutButton from "@/app/(auth)/components/logout-btn";
import Link from "next/link";
import { AiOutlineBank } from "react-icons/ai";
import { FaBitcoin } from "react-icons/fa";
import {
	HiOutlineClipboardList,
	HiOutlineCurrencyDollar,
	HiOutlineViewGrid,
	HiUserGroup,
} from "react-icons/hi";
import { LuGift } from "react-icons/lu";
import { MdOutlinePayment, MdVerifiedUser } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import Header from "./header";

function Wrapper({ children }) {
	return (
		<>
			<div className="drawer block lg:flex flex-row-reverse lg:drawer-open ">
				<input
					id="my-drawer-2"
					type="checkbox"
					className="drawer-toggle"
				/>
				<div className="drawer-content flex-1">
					{/* Page content here */}
					<div className="">
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
								<Link href="/admin/crypto">
									<span>
										<FaBitcoin className="w-6 h-6 stroke-current" />
									</span>
									<span>Cryptocurrencies</span>
								</Link>
							</li>
							<li>
								<Link href="/admin/payments-accounts">
									<span>
										<MdOutlinePayment className="w-6 h-6 stroke-current" />
									</span>
									<span>Payment accounts</span>
								</Link>
							</li>
							<li>
								<Link href="/admin/verification-accounts">
									<span>
										<MdVerifiedUser className="w-6 h-6 stroke-current" />
									</span>
									<span>Verification Accounts</span>
								</Link>
							</li>
							<li>
								<Link href="/admin/gift-card">
									<span>
										<LuGift className="w-6 h-6 stroke-current" />
									</span>
									<span>Giftcards</span>
								</Link>
							</li>
							<li>
								<Link href="/admin/bank-details">
									<span>
										<AiOutlineBank className="w-6 h-6 stroke-current" />
									</span>
									<span>Bank details</span>
								</Link>
							</li>
							<li>
								<Link href="/admin/rate">
									<span>
										<HiOutlineCurrencyDollar className="w-6 h-6 stroke-current" />
									</span>
									<span>Dollar rate</span>
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

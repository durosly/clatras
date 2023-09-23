import Link from "next/link";
import { FaBitcoin } from "react-icons/fa";
import { TbCalendarDown } from "react-icons/tb";
import { Suspense } from "react";
import { BsGift } from "react-icons/bs";
import { MdOutlinePayment, MdOutlineVerifiedUser } from "react-icons/md";
import ListItemContainer from "./components/list-item-container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/options";
import NoticeDisplay from "./components/notice-display";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

async function UserHomePage() {
	const session = await getServerSession(authOptions);
	const name = session.user.name;

	return (
		<div className="mx-5 sm:mx-10 py-5 space-y-8">
			{/* <div className="alert flex gap-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					className="stroke-info shrink-0 w-6 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					></path>
				</svg>
				<span className="text-xs">
					Click{" "}
					<Link
						className="link"
						href="/nice"
					>
						here
					</Link>{" "}
					to verify your email address
				</span>
				<div className="ml-auto">
					<button className="btn btn-sm btn-ghost btn-square">
						<HiXMark className="w-4 h-4" />
					</button>
				</div>
			</div> */}
			<p>Hi, {name}</p>

			<NoticeDisplay />
			<div className="flex flex-wrap justify-center gap-4">
				<Link
					href="/user/payments"
					className="flex-1 max-w-[130px] group hover:bg-slate-100 hover:border-primary text-center border p-5 rounded-xl"
				>
					<div className="w-20 aspect-square rounded-full bg-primary/10 flex justify-center items-center">
						<MdOutlinePayment className="w-10 h-10" />
					</div>
					<p className="flex flex-col">
						<span>Funds</span>
						<span>Exchange</span>
					</p>
				</Link>
				<Link
					href="/user/crypto"
					className="flex-1 max-w-[130px] group hover:bg-slate-100 hover:border-primary text-center border p-5 rounded-xl"
				>
					<div className="w-20 aspect-square rounded-full bg-primary/10 flex justify-center items-center">
						<FaBitcoin className="w-10 h-10" />
					</div>
					<p>Crypto</p>
				</Link>
				<Link
					href="/user/giftcards"
					className="flex-1 max-w-[130px] group hover:bg-slate-100 hover:border-primary text-center border p-5 rounded-xl"
				>
					<div className="w-20 aspect-square rounded-full bg-primary/10 flex justify-center items-center">
						<BsGift className="w-10 h-10" />
					</div>
					<p>Ecode</p>
				</Link>
				<Link
					href="/user/verification-accounts"
					className="flex-1 max-w-[130px] group hover:bg-slate-100 hover:border-primary text-center border p-5 rounded-xl"
				>
					<div className="w-20 aspect-square rounded-full bg-primary/10 flex justify-center items-center">
						<MdOutlineVerifiedUser className="w-10 h-10" />
					</div>
					<p className="flex flex-col">
						<span>Acount &</span>
						<span>verifications</span>
					</p>
				</Link>
			</div>
			<div className="space-y-8">
				{/* <div className="border p-5 rounded-md">
					<div className="flex gap-2 items-center">
						<span className="w-8 aspect-square rounded-full bg-primary/20 flex justify-center items-center">
							<TbArrowsExchange className="w-5 h-5" />
						</span>
						<h2 className="font-bold">Exchange</h2>
					</div>
					<div className="mt-4 space-x-2">
						<Link
							className="btn btn-sm btn-outline"
							href="/user/exchange/btc"
						>
							<FaBitcoin />
							<span>Bitcoin</span>
						</Link>
						<Link
							className="btn btn-sm btn-outline"
							href="/user/exchange/pi"
						>
							<TbMathPi />
							<span>PI</span>
						</Link>
					</div>
				</div>
				<div className="border p-5 rounded-md">
					<div className="flex gap-2 items-center">
						<span className="w-8 aspect-square rounded-full bg-primary/20 flex justify-center items-center">
							<RiSecurePaymentLine className="w-5 h-5" />
						</span>
						<h2 className="font-bold">Accounts</h2>
					</div>
					<div className="mt-4 space-x-2">
						<Link
							className="btn btn-sm btn-outline"
							href="/user/exchange/cashapp"
						>
							<SiCashapp />
							<span>CashApp</span>
						</Link>
						<Link
							className="btn btn-sm btn-outline"
							href="/user/exchange/zelle"
						>
							<SiZelle />
							<span>Zelle</span>
						</Link>
					</div>
				</div>
				<div className="border p-5 rounded-md">
					<div className="flex gap-2 items-center">
						<span className="w-8 aspect-square rounded-full bg-primary/20 flex justify-center items-center">
							<AiOutlineGooglePlus className="w-5 h-5" />
						</span>
						<h2 className="font-bold">Google voice</h2>
					</div>
					<div className="mt-4 space-x-2">
						<Link
							className="btn btn-sm btn-outline"
							href="/user/google-voice"
						>
							<BsCartPlus />
							<span>Purchase</span>
						</Link>
					</div>
				</div> */}
				<div className="border p-5 rounded-md">
					<div className="flex gap-2 items-center">
						<span className="w-8 aspect-square rounded-full bg-primary/20 flex justify-center items-center">
							<TbCalendarDown className="w-5 h-5" />
						</span>
						<h2 className="font-bold">Transaction history</h2>
					</div>
					<div className="mt-4 overflow-x-auto">
						<table className="table table-sm sm:table-md table-zebra min-w-[500px]">
							{/* head */}
							<thead>
								<tr>
									<th></th>
									<th>Summary</th>
									<th>Amount</th>
									<th>Status</th>
									<th>Date/Time</th>
								</tr>
							</thead>
							<Suspense
								fallback={
									<tr>
										<td
											className="bg-slate-400 animate-pulse"
											colSpan={5}
										></td>
									</tr>
								}
							>
								<ListItemContainer />
							</Suspense>
						</table>
					</div>
					<div className="text-right">
						<Link
							className="link-hover"
							href="/user/transactions"
						>
							See all &rarr;
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserHomePage;

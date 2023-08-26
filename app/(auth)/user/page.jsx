import Link from "next/link";
import { TbArrowsExchange, TbCalendarDown, TbMathPi } from "react-icons/tb";
import { FaBitcoin } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { SiCashapp, SiZelle } from "react-icons/si";
import { AiOutlineGooglePlus } from "react-icons/ai";
import { BsCartPlus, BsGift } from "react-icons/bs";
import ListItemContainer from "./components/list-item-container";
import { Suspense } from "react";
import { MdOutlinePayment, MdOutlineVerifiedUser } from "react-icons/md";

async function UserHomePage() {
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

			<div className="bg-primary/10 p-5 rounded-2xl">
				<h2 className="text-xl font-bold">Welcome to Clatras</h2>
				<p className="text-sm">Experience fast and easy transactions</p>
			</div>
			<div className="flex flex-wrap justify-center gap-4">
				<Link
					href="/user/giftcards"
					className="flex-1 max-w-[130px] group hover:bg-slate-100 hover:border-primary text-center border p-5 rounded-xl"
				>
					<div className="w-20 aspect-square rounded-full bg-primary/10 flex justify-center items-center">
						<BsGift className="w-10 h-10" />
					</div>
					<p>Gift Cards</p>
				</Link>
				<Link
					href="/user/verification-accounts"
					className="flex-1 max-w-[130px] group hover:bg-slate-100 hover:border-primary text-center border p-5 rounded-xl"
				>
					<div className="w-20 aspect-square rounded-full bg-primary/10 flex justify-center items-center">
						<MdOutlineVerifiedUser className="w-10 h-10" />
					</div>
					<p>Verifications</p>
				</Link>
				<Link
					href="/user/payments"
					className="flex-1 max-w-[130px] group hover:bg-slate-100 hover:border-primary text-center border p-5 rounded-xl"
				>
					<div className="w-20 aspect-square rounded-full bg-primary/10 flex justify-center items-center">
						<MdOutlinePayment className="w-10 h-10" />
					</div>
					<p>Payment</p>
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

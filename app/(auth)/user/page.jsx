import Link from "next/link";
import { TbArrowsExchange, TbCalendarDown, TbMathPi } from "react-icons/tb";
import { FaBitcoin } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { SiCashapp, SiZelle } from "react-icons/si";
import { AiOutlineGooglePlus } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import ListItemContainer from "./components/list-item-container";

async function UserHomePage() {
	return (
		<div className="mx-5 sm:mx-10 py-5 space-y-4">
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

			<div className="space-y-8">
				<div className="border p-5 rounded-md">
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
							href="/nice"
						>
							<BsCartPlus />
							<span>Purchase</span>
						</Link>
					</div>
				</div>
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
								</tr>
							</thead>
							<ListItemContainer />
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserHomePage;

import { LiaWalletSolid } from "react-icons/lia";
import BTCWallets from "./btc-wallet";
import PIWallets from "./pi-wallet";
import CashappWallets from "./cashapp";
import ZelleWallets from "./zelle";

function AdminWalletsPage() {
	return (
		<div>
			<div className="flex gap-2 items-center">
				<span className="w-8 aspect-square rounded-full flex justify-center items-center">
					<LiaWalletSolid className="w-5 h-5" />
				</span>
				<h2 className="font-bold">Wallets</h2>
			</div>
			<div className="mt-2 space-y-4">
				<BTCWallets />
				<div className="divider">Next wallet</div>
				<PIWallets />
				<div className="divider">Next wallet</div>
				<CashappWallets />
				<div className="divider">Next wallet</div>
				<ZelleWallets />
			</div>
		</div>
	);
}

export default AdminWalletsPage;

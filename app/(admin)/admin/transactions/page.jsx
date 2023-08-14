import { TbCalendarDown } from "react-icons/tb";
import ListWrapper from "./list-wrapper";

function AdminTransactionsPage() {
	return (
		<div>
			<div className="flex gap-2 items-center">
				<span className="w-8 aspect-square rounded-full flex justify-center items-center">
					<TbCalendarDown className="w-5 h-5" />
				</span>
				<h2 className="font-bold">Transactions</h2>
			</div>
			<ListWrapper />
		</div>
	);
}

export default AdminTransactionsPage;

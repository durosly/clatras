import { BsGoogle } from "react-icons/bs";
import { GrBitcoin } from "react-icons/gr";
import { SiCashapp, SiZelle } from "react-icons/si";
import TransactionsData from "./components/transactions-data";

function AdminDashboard() {
	return (
		<div>
			<TransactionsData />
			{/* <div className="card flex flex-wrap p-10 border mt-5 space-y-5">
				<div>
					<p className="text-2xl font-bold">No of users</p>
					<p>200</p>
				</div>
				<div>
					<p>Customers</p>
					<p>200</p>
				</div>
			</div> */}
		</div>
	);
}

export default AdminDashboard;

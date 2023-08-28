import TransactionsData from "./components/transactions-data";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

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

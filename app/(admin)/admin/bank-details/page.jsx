import { AppwriteServerClient } from "@/lib/client-server";
import { Databases, Query } from "node-appwrite";
// import GiftCardCreationForm from "./components/gitfcard-creation-form";
// import GiftCardListItem from "./components/giftcard-list-item";
import BankDetailsCreationForm from "./components/bank-details-creation-form";
import BankDetailsListItem from "./components/bank-details-list-item";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

async function BankDetailsPage() {
	const app = new AppwriteServerClient();
	app.setKey();
	const server = app.getServer();

	const databases = new Databases(server);

	let databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
	let collectionId =
		process.env.NEXT_PUBLIC_APPRWRITE_BANK_DETAILS_COLLECTION_ID;

	const docs = await databases.listDocuments(databaseId, collectionId, [
		Query.equal("userId", ["admin"]),
	]);

	return (
		<div>
			<h1 className="font-bold">Bank Details</h1>
			<BankDetailsCreationForm />

			<div className="overflow-x-auto">
				<table className="table">
					{/* head */}
					<thead>
						<tr>
							<th></th>
							<th>Bank Name</th>
							<th>Account Name</th>
							<th>Account Number</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{docs.total > 0 ? (
							docs.documents.map((d, i) => (
								<BankDetailsListItem
									key={d.$id}
									doc={d}
									count={i + 1}
								/>
							))
						) : (
							<tr>
								<td colSpan={5}>No giftcard service found</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default BankDetailsPage;

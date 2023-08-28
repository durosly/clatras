import { AppwriteServerClient } from "@/lib/client-server";
// import PaymentCreationForm from "./components/payment-creation-form";
// import PaymentListItem from "./components/payment-list-item";
import { Databases } from "node-appwrite";
import GiftCardCreationForm from "./components/gitfcard-creation-form";
import GiftCardListItem from "./components/giftcard-list-item";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

async function GiftCardPage() {
	const app = new AppwriteServerClient();
	app.setKey();
	const server = app.getServer();

	const databases = new Databases(server);

	let databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
	let collectionId = process.env.NEXT_PUBLIC_APPRWRITE_GIFTCARD_COLLECTION_ID;

	const docs = await databases.listDocuments(databaseId, collectionId);

	return (
		<div>
			<h1 className="font-bold">Giftcards</h1>
			<GiftCardCreationForm />

			<div className="overflow-x-auto">
				<table className="table">
					{/* head */}
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Abbreviation</th>
							<th>Fee(per $)</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{docs.total > 0 ? (
							docs.documents.map((d, i) => (
								<GiftCardListItem
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

export default GiftCardPage;

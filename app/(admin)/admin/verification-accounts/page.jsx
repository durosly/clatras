import { AppwriteServerClient } from "@/lib/client-server";
// import PaymentListItem from "./components/payment-list-item";
import { Databases } from "node-appwrite";
import VerificationAccountCreationForm from "./components/verification-account-form";
import VerificationListItem from "./components/verification-list-item";

async function VerificationsAccountPage() {
	const app = new AppwriteServerClient();
	app.setKey();
	const server = app.getServer();

	const databases = new Databases(server);

	let databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
	let collectionId =
		process.env.NEXT_PUBLIC_APPRWRITE_VERIFICATION_ACCOUNT_COLLECTION_ID;

	const docs = await databases.listDocuments(databaseId, collectionId);

	return (
		<div>
			<h1 className="font-bold">Verification Accounts</h1>
			<VerificationAccountCreationForm />

			<div className="overflow-x-auto">
				<table className="table">
					{/* head */}
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Abbreviation</th>
							<th>Fee($)</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{docs.total > 0 ? (
							docs.documents.map((d, i) => (
								<VerificationListItem
									key={d.$id}
									doc={d}
									count={i + 1}
								/>
							))
						) : (
							<tr>
								<td colSpan={5}>No Accounts found</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default VerificationsAccountPage;

import { AppwriteServerClient } from "@/lib/client-server";
import Link from "next/link";
import CryptoListItem from "./components/crypto-list-item";
import { Databases } from "node-appwrite";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

async function AdminCryptoPage() {
	const app = new AppwriteServerClient();
	app.setKey();
	const server = app.getServer();

	const databases = new Databases(server);

	let databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
	let collectionId =
		process.env.NEXT_PUBLIC_APPRWRITE_CRYPTO_INFO_COLLECTION_ID;

	const doc = await databases.listDocuments(databaseId, collectionId);

	return (
		<div>
			<h1>Cryptocurrencies</h1>
			<Link
				href="/admin/crypto/create"
				className="btn btn-primary"
			>
				Add new
			</Link>

			<div className="overflow-x-auto mt-4">
				<table className="table table-zebra">
					{/* head */}
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Network</th>
							<th>Address</th>
							<th>Rate($)</th>
							<td>Action</td>
						</tr>
					</thead>
					<tbody>
						{doc.total > 0 ? (
							doc.documents.map((d, i) => (
								<CryptoListItem
									key={d.$id}
									doc={d}
									count={i + 1}
								/>
							))
						) : (
							<tr>
								<td colSpan={8}>No cryptocurrency yet</td>
							</tr>
						)}
						{/* row 1 */}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default AdminCryptoPage;

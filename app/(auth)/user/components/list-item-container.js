import clientServer from "@/lib/client-server";
import { Databases, Query } from "node-appwrite";
import ListItem from "./list-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/options";

async function ListItemContainer() {
	const session = await getServerSession(authOptions);

	clientServer.setKey(process.env.APPWRITE_API_KEY);
	const databases = new Databases(clientServer);
	const userId = session.user.userId;

	const documents = await databases.listDocuments(
		process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
		process.env.NEXT_PUBLIC_APPRWRITE_TRANSACTION_COLLECTION_ID,
		[
			Query.equal("userId", userId),
			Query.limit(5),
			Query.orderDesc("$createdAt"),
		]
	);

	const d_rate = await databases.listDocuments(
		process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
		process.env.NEXT_PUBLIC_APPRWRITE_DOLLAR_RATE_COLLECTION_ID
	);

	return (
		<tbody>
			{documents.documents.length > 0 ? (
				documents.documents.map((d, i) => (
					<ListItem
						key={d.$id}
						doc={d}
						count={i + 1}
						d_rate={d_rate?.documents[0]?.rate || 1}
					/>
				))
			) : (
				<tr>
					<td colSpan={5}>No Transaction history</td>
				</tr>
			)}
		</tbody>
	);
}

export default ListItemContainer;

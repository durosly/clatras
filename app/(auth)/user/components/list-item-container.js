import getActiveUser from "@/app/(auth)/lib/get-user";
import clientServer from "@/lib/client-server";
import { Databases, Query } from "node-appwrite";
import ListItem from "./list-item";

async function ListItemContainer() {
	clientServer.setKey(process.env.APPWRITE_API_KEY);
	const databases = new Databases(clientServer);
	const userId = await getActiveUser();

	const documents = await databases.listDocuments(
		process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
		process.env.NEXT_PUBLIC_APPRWRITE_TRANSACTION_COLLECTION_ID,
		[
			Query.equal("userId", userId.value),
			Query.limit(5),
			Query.orderDesc("$createdAt"),
		]
	);

	return (
		<tbody>
			{documents.documents.map((d, i) => (
				<ListItem
					key={d.$id}
					doc={d}
					count={i + 1}
				/>
			))}
		</tbody>
	);
}

export default ListItemContainer;

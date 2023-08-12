import { TbCalendarDown } from "react-icons/tb";
import ListWrapper from "./lits-wrapper";
import { Databases, Query } from "node-appwrite";
import clientServer from "@/lib/client-server";
import getActiveUser from "../../lib/get-user";

async function UserTransactionHistoryPage() {
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
		<div className="mx-5 sm:mx-10 py-5 space-y-4">
			<div className="border p-5 rounded-md">
				<div className="flex gap-2 items-center">
					<span className="w-8 aspect-square rounded-full flex justify-center items-center">
						<TbCalendarDown className="w-5 h-5" />
					</span>
					<h2 className="font-bold">Transaction history</h2>
				</div>
				<ListWrapper documents={documents.documents} />
			</div>
		</div>
	);
}

export default UserTransactionHistoryPage;

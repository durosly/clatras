import { Databases, Users, Query } from "node-appwrite";
import PurchaseDisplay from "./components/purchase-display";
import clientServer from "@/lib/client-server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/options";
import Link from "next/link";
import { MdOutlinePayment } from "react-icons/md";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

async function UserPaymentAccountPage() {
	const session = await getServerSession(authOptions);
	const userId = session.user.userId;
	clientServer.setKey(process.env.APPWRITE_API_KEY);
	const database = new Databases(clientServer);
	let database_id = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
	let payment_collection_id =
		process.env.NEXT_PUBLIC_APPRWRITE_EXCHANGE_ACCOUNT_INFO_COLLECTION_ID;
	let bank_collection_id =
		process.env.NEXT_PUBLIC_APPRWRITE_BANK_DETAILS_COLLECTION_ID;

	const docs = await database.listDocuments(
		database_id,
		payment_collection_id
	);

	const doc1 = await database.listDocuments(database_id, bank_collection_id, [
		Query.equal("userId", userId),
		Query.limit(1),
	]);

	const d_rate = await database.listDocuments(
		process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
		process.env.NEXT_PUBLIC_APPRWRITE_DOLLAR_RATE_COLLECTION_ID
	);

	return (
		<div className="max-w-[400px] mx-auto mt-10 px-4  mb-10">
			<div className="border px-8 py-10 rounded-md space-y-10">
				<div className="text-center">
					<div className="w-14 mx-auto aspect-square rounded-full bg-primary/10 flex justify-center items-center">
						<MdOutlinePayment className="w-7 h-7" />
					</div>
					<h2 className="uppercase font-bold">Payment</h2>
					<p className="text-xs">Request Payment accounts</p>
				</div>
				{doc1.total > 0 ? (
					<PurchaseDisplay
						docs={docs.documents}
						details={doc1.documents[0]}
						d_rate={d_rate?.documents[0]?.rate || 1}
					/>
				) : (
					<div className="text-center space-y-4">
						<p>
							Please, setup your account details before you
							continue
						</p>
						<Link
							className="btn btn-primary"
							href="/user/profile"
						>
							Bank details
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}

export default UserPaymentAccountPage;

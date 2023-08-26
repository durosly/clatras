import { Databases, Users, Query } from "node-appwrite";
import PurchaseDisplay from "./components/purchase-display";
import clientServer from "@/lib/client-server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/options";
import Link from "next/link";
import { MdOutlineVerifiedUser } from "react-icons/md";

async function UserVerificationAccountPage() {
	const session = await getServerSession(authOptions);
	const userId = session.user.userId;
	clientServer.setKey(process.env.APPWRITE_API_KEY);
	const database = new Databases(clientServer);
	let database_id = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
	let verification_collection_id =
		process.env.NEXT_PUBLIC_APPRWRITE_VERIFICATION_ACCOUNT_COLLECTION_ID;
	let bank_collection_id =
		process.env.NEXT_PUBLIC_APPRWRITE_BANK_DETAILS_COLLECTION_ID;

	const docs = await database.listDocuments(
		database_id,
		verification_collection_id
	);
	const bankDocs = await database.listDocuments(
		database_id,
		bank_collection_id,
		[Query.equal("userId", "admin")]
	);

	const users = new Users(clientServer);

	const user = await users.get(userId);

	return (
		<div className="max-w-[400px] mx-auto mt-10 px-4  mb-10">
			<div className="border px-8 py-10 rounded-md space-y-10">
				<div className="text-center">
					<div className="w-14 mx-auto aspect-square rounded-full bg-primary/10 flex justify-center items-center">
						<MdOutlineVerifiedUser className="w-7 h-7" />
					</div>
					<h2 className="uppercase font-bold">Verification</h2>
					<p className="text-xs">Purchase verification accounts</p>
				</div>
				{user.emailVerification ? (
					<PurchaseDisplay
						docs={docs.documents}
						details={bankDocs.documents}
					/>
				) : (
					<div className="text-center space-y-4">
						<p>Please, verify your email address to continue</p>
						<Link
							className="btn btn-primary"
							href="/user/profile"
						>
							Profile
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}

export default UserVerificationAccountPage;

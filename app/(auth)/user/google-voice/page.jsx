import { Databases, Users } from "node-appwrite";
import PurchaseDisplay from "./components/purchase-display";
import clientServer from "@/lib/client-server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/options";
import Link from "next/link";

async function GoogleVoicPurchasePage() {
	const session = await getServerSession(authOptions);
	const userId = session.user.userId;
	clientServer.setKey(process.env.APPWRITE_API_KEY);
	const database = new Databases(clientServer);
	let database_id = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
	let collection_id = process.env.NEXT_PUBLIC_APPRWRITE_G_VOICE_COLLECTION_ID;

	const doc = await database.getDocument(
		database_id,
		collection_id,
		"64d6828391e8d5b522e8"
	);

	const users = new Users(clientServer);

	const user = await users.get(userId);

	return (
		<div className="max-w-[400px] mx-auto mt-10 border px-8 rounded-md py-10 space-y-10 mb-10">
			<div className="text-center">
				<h2 className="uppercase font-bold">Google Voice</h2>
			</div>
			{user.emailVerification ? (
				<PurchaseDisplay doc={doc} />
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
	);
}

export default GoogleVoicPurchasePage;

import { Databases } from "node-appwrite";
import PurchaseDisplay from "./components/purchase-display";
import clientServer from "@/lib/client-server";

async function GoogleVoicPurchasePage() {
	clientServer.setKey(process.env.APPWRITE_API_KEY);
	const database = new Databases(clientServer);
	let database_id = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
	let collection_id = process.env.NEXT_PUBLIC_APPRWRITE_G_VOICE_COLLECTION_ID;

	const doc = await database.getDocument(
		database_id,
		collection_id,
		"64d6828391e8d5b522e8"
	);

	return (
		<div className="max-w-[400px] mx-auto mt-10 border px-10 rounded-md py-10 space-y-10 mb-10">
			<div className="text-center">
				<h2 className="uppercase font-bold">Google Voice</h2>
			</div>
			<PurchaseDisplay doc={doc} />
		</div>
	);
}

export default GoogleVoicPurchasePage;

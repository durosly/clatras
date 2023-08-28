import { AppwriteServerClient } from "@/lib/client-server";
import RateForm from "./components/rate-form";
import { Databases, Query } from "node-appwrite";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

async function DollarRatePage() {
	const app = new AppwriteServerClient();
	app.setKey();
	const server = app.getServer();

	const databases = new Databases(server);

	let databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
	let collectionId =
		process.env.NEXT_PUBLIC_APPRWRITE_DOLLAR_RATE_COLLECTION_ID;

	const doc = await databases.listDocuments(databaseId, collectionId, [
		Query.limit(1),
	]);

	const price = doc.total > 0 ? doc.documents[0].rate : 0;

	return (
		<div>
			<div>
				<h1 className="text-center">Dollar Rate</h1>
				<p>Current: {price}</p>
			</div>
			<RateForm />
		</div>
	);
}

export default DollarRatePage;

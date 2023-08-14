import { Databases, Query } from "node-appwrite";
import clientServer from "@/lib/client-server";
import { notFound } from "next/navigation";
import ExchangeDisplay from "./display";

async function ExchangeTypePage({ params: { type } }) {
	clientServer.setKey(process.env.APPWRITE_API_KEY);
	const database = new Databases(clientServer);
	let database_id = "";
	let collection_id = "";
	let doc_style = null;

	database_id = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
	if (type === "btc" || type === "pi") {
		collection_id =
			process.env.NEXT_PUBLIC_APPRWRITE_CRYPTO_INFO_COLLECTION_ID;
		doc_style = "crypto";
	} else if (type === "cashapp" || type === "zelle") {
		doc_style = "account";
		collection_id =
			process.env
				.NEXT_PUBLIC_APPRWRITE_EXCHANGE_ACCOUNT_INFO_COLLECTION_ID;
	}

	const docs = await database.listDocuments(database_id, collection_id, [
		Query.equal("abbr", type),
	]);
	// console.log(docs);

	if (docs.total < 1) {
		notFound();
	}

	const document = docs.documents[0];
	return (
		<div className="max-w-[400px] mx-auto mt-10 border px-10 rounded-md py-3 space-y-10 mb-10">
			<div className="text-center">
				<h2 className="uppercase font-bold">{document.name}</h2>
			</div>
			<ExchangeDisplay
				type={doc_style}
				document={document}
			/>
		</div>
	);
}

export default ExchangeTypePage;

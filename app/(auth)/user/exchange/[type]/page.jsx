import { Databases, Query } from "node-appwrite";
import clientServer from "@/lib/client-server";
import { notFound } from "next/navigation";
import ExchangeDisplay from "./display";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/options";
import Link from "next/link";

async function ExchangeTypePage({ params: { type } }) {
	const session = await getServerSession(authOptions);
	const userId = session.user.userId;
	clientServer.setKey(process.env.APPWRITE_API_KEY);
	const database = new Databases(clientServer);
	let database_id = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
	let collection_id = "";
	let doc_style = null;

	const doc1 = await database.listDocuments(
		database_id,
		process.env.NEXT_PUBLIC_APPRWRITE_BANK_DETAILS_COLLECTION_ID,
		[Query.equal("userId", userId), Query.limit(1)]
	);

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
		<div className="max-w-[400px] mx-auto mt-10 border px-8 rounded-md py-10 space-y-10 mb-10">
			<div className="text-center">
				<h2 className="uppercase font-bold">{document.name}</h2>
			</div>
			{doc1.documents.length > 0 ? (
				<ExchangeDisplay
					type={doc_style}
					document={document}
				/>
			) : (
				<div className="text-center space-y-4">
					<p>
						Please, setup your account details before you continue
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
	);
}

export default ExchangeTypePage;

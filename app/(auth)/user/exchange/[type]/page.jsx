import { MdContentCopy } from "react-icons/md";
import QRCode from "react-qr-code";
import ExchangeSuccessModal from "./modal";
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
			{/* step 1 */}
			{/* <div className="space-y-10">
				<div>
					<div className="flex justify-between gap-2">
						<span>1 BTC</span>
						<span className="font-bold">&#8358; 2,000,000.00</span>
					</div>
					<div className="flex justify-between gap-2">
						<span>Fee</span>
						<span className="font-bold">&#8358; 200.00</span>
					</div>
				</div>
				<div>
					<div className="form-control mb-2">
						<label className="label">Amount(BTC)</label>
						<input
							type="number"
							className="input input-bordered"
							placeholder="0.001"
							inputMode="numeric"
						/>
					</div>
					<div>
						<button className="btn btn-block btn-primary">
							Calculate
						</button>
					</div>
				</div>
				<div className="text-center space-y-2">
					<p>Returns</p>
					<p className="text-2xl font-bold">&#8358; 400,000.00</p>
					<div>
						<button className="btn btn-primary">Next</button>
					</div>
				</div>
			</div> */}
			{/* step 2 */}
			{/* <div className="space-y-10">
				<div>
					<div className="flex justify-between gap-2">
						<span>Sending</span>
						<span>0.00001 BTC</span>
					</div>
					<div className="flex justify-between gap-2">
						<span>Returns</span>
						<span>&#8358; 400,000</span>
					</div>
				</div>
				<div>
					<div className="flex gap-2 justify-between flex-wrap items-center">
						<p className="text-sm">Address:</p>
						<p className="text-xs">
							btc-e8rty9e8y87dr7y8s7fy8s7f8e7r8s7yf8s7
						</p>
					</div>
					<div className="text-right">
						<button className="btn btn-sm btn-square">
							<MdContentCopy />
						</button>
					</div>
				</div>
				<div>
					<div className="max-w-[200px] mx-auto">
						<QRCode
							style={{
								height: "auto",
								maxWidth: "100%",
								width: "100%",
							}}
							size={256}
							value="btc-e8rty9e8y87dr7y8s7fy8s7f8e7r8s7yf8s7"
						/>
					</div>
				</div>
				<div className="text-center">
					<button className="btn btn-primary">Done</button>
				</div>
				<div>
					<p className="text-xs">
						* only click done after make transaction to avoid delay
					</p>
				</div>
			</div> */}
		</div>
	);
}

export default ExchangeTypePage;

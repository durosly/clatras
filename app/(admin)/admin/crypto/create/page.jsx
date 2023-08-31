import CreateCryptoForm from "./create-crypto-form";
import CoinMarketCap from "coinmarketcap-api";

async function AdminCreateCryptoPage() {
	const client = new CoinMarketCap(process.env.COINMARKETCAP_API);
	const mapData = await client.getIdMap({ sort: "cmc_rank", limit: 100 });

	return (
		<div>
			<h1>Add new Cryptocurrency</h1>
			<CreateCryptoForm c_list={mapData?.data || []} />
		</div>
	);
}

export default AdminCreateCryptoPage;

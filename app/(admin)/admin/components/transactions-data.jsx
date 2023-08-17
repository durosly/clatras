"use client";
import axios from "axios";
import commaNumber from "comma-number";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsGoogle } from "react-icons/bs";
import { GrBitcoin } from "react-icons/gr";
import { SiCashapp, SiZelle } from "react-icons/si";

function TransactionsData() {
	const [isLoading, setIsLoading] = useState(false);
	const [interval, setInterval] = useState("24h");
	const [data, setData] = useState({
		total: { count: 0, bal: 0 },
		btc: { per: 0, count: 0, bal: 0 },
		pi: { per: 0, count: 0, bal: 0 },
		cashapp: { per: 0, count: 0, bal: 0 },
		zelle: { per: 0, count: 0, bal: 0 },
		google: { per: 0, count: 0, bal: 0 },
	});

	async function loadTransactionStats(entry) {
		if (isLoading) return;
		setIsLoading(true);
		try {
			const response = await axios("/api/admin/transactions/history", {
				params: { interval: entry },
			});

			if (response.data.status) {
				setData(response.data.data);
			} else {
				throw new Error(response.data.message);
			}
			setInterval(entry);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		loadTransactionStats(interval);
	}, []);

	return (
		<div>
			<div className="flex flex-wrap gap-2">
				<button
					disabled={isLoading}
					className={`btn btn-sm ${
						interval === "1m" && "btn-primary"
					}`}
					onClick={() => loadTransactionStats("1m")}
				>
					1 month
				</button>
				<button
					disabled={isLoading}
					className={`btn btn-sm ${
						interval === "1w" && "btn-primary"
					}`}
					onClick={() => loadTransactionStats("1w")}
				>
					1 week
				</button>
				<button
					disabled={isLoading}
					className={`btn btn-sm ${
						interval === "3d" && "btn-primary"
					}`}
					onClick={() => loadTransactionStats("3d")}
				>
					3 days
				</button>
				<button
					disabled={isLoading}
					className={`btn btn-sm ${
						interval === "24h" && "btn-primary"
					}`}
					onClick={() => loadTransactionStats("24h")}
				>
					24 hours
				</button>
			</div>
			<div className="card border mt-4 p-10">
				<div className="mb-5">
					<p className="text-sm">
						Total Revenue: {commaNumber(data.total.count)}
					</p>
					<p className="text-3xl font-bold">
						&#8358; {commaNumber(data.total.bal)}
					</p>
				</div>
				{isLoading ? (
					<div>
						<span className="loading loading-ball"></span>
						<p>Loading...</p>
					</div>
				) : (
					<div className="flex flex-wrap gap-5">
						<div className="flex gap-2 flex-[200px]">
							<div className="w-11 aspect-square flex justify-center items-center bg-primary/50 rounded-md">
								<GrBitcoin className="w-5 h-5" />
							</div>
							<div>
								<div className="flex items-center gap-1">
									<p className="text-sm">BTC</p>
									<span className="badge badge-sm badge-primary">
										{data.btc.per.toFixed(2)}%
									</span>
								</div>
								<p className="text-xs">
									{data.btc.count} (&#8358;{" "}
									{commaNumber(data.btc.bal)})
								</p>
							</div>
						</div>
						<div className="flex gap-2 flex-[200px]">
							<div className="w-11 aspect-square flex justify-center items-center bg-primary/50 rounded-md">
								<GrBitcoin className="w-5 h-5" />
							</div>
							<div>
								<div className="flex items-center gap-1">
									<p className="text-sm">PI coin</p>
									<span className="badge badge-sm badge-primary">
										{data.pi.per.toFixed(2)}%
									</span>
								</div>
								<p className="text-xs">
									{data.pi.count} (&#8358;{" "}
									{commaNumber(data.pi.bal)})
								</p>
							</div>
						</div>
						<div className="flex gap-2 flex-[200px]">
							<div className="w-11 aspect-square flex justify-center items-center bg-primary/50 rounded-md">
								<SiCashapp className="w-5 h-5" />
							</div>
							<div>
								<div className="flex items-center gap-1">
									<p className="text-sm">Cashapp</p>
									<span className="badge badge-sm badge-primary">
										{data.cashapp.per.toFixed(2)}%
									</span>
								</div>
								<p className="text-xs">
									{data.cashapp.count} (&#8358;{" "}
									{commaNumber(data.cashapp.bal)})
								</p>
							</div>
						</div>
						<div className="flex gap-2 flex-[200px]">
							<div className="w-11 aspect-square flex justify-center items-center bg-primary/50 rounded-md">
								<SiZelle className="w-5 h-5" />
							</div>
							<div>
								<div className="flex items-center gap-1">
									<p className="text-sm">Zelle</p>
									<span className="badge badge-sm badge-primary">
										{data.zelle.per.toFixed(2)}%
									</span>
								</div>
								<p className="text-xs">
									{data.zelle.count} (&#8358; {data.zelle.bal}
									)
								</p>
							</div>
						</div>
						<div className="flex gap-2 flex-[200px]">
							<div className="w-11 aspect-square flex justify-center items-center bg-primary/50 rounded-md">
								<BsGoogle className="w-5 h-5" />
							</div>
							<div>
								<div className="flex items-center gap-1">
									<p className="text-sm">Google Voice</p>
									<span className="badge badge-sm badge-primary">
										{data.google.per.toFixed(2)}%
									</span>
								</div>
								<p className="text-xs">
									{data.google.count} (&#8358;{" "}
									{commaNumber(data.google.bal)})
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default TransactionsData;

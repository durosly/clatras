"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const initialState = { address: "", rate: "", id: "", network: "" };

function PIWallets() {
	const [data, setData] = useState(initialState);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	async function handleSubmit(e) {
		e.preventDefault();
		if (isUpdating) return;
		const toastId = toast.loading("Updating...");
		try {
			setIsUpdating(true);

			const response = await axios.put("/api/admin/wallets?type=pi", {
				...data,
			});

			if (response?.data.status) {
				toast.success("Updated", { id: toastId });

				// setData({ ...initialState });
			} else {
				throw new Error("invalid credentials");
			}
		} catch (error) {
			toast.error(error.message, { id: toastId });
		} finally {
			setIsUpdating(false);
		}
	}

	useEffect(() => {
		async function loadBTCDetails() {
			try {
				const response = await axios(`/api/admin/wallets?type=pi`);
				if (response.data.status) {
					const { doc } = response.data;
					setData({
						address: doc.address,
						rate: doc.rate,
						id: doc.$id,
						network: doc.network,
					});
					console.log(doc);
				}
				// console.log(response);
			} catch (error) {
				// toast.error(error.message);
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		}

		loadBTCDetails();
	}, []);

	return (
		<div className="mt-4">
			<h2 className="text-xs">PI wallet info</h2>
			{isLoading ? (
				<div>
					<span className="loading loading-ball"></span>
					<p>Loading...</p>
				</div>
			) : (
				<form onSubmit={handleSubmit}>
					<div className="form-control mb-2">
						<input
							type="text"
							className="input input-bordered"
							placeholder="btcod8r9ds89898...."
							name="address"
							value={data.address}
							onChange={(e) =>
								setData({
									...data,
									[e.target.name]: e.target.value,
								})
							}
						/>
					</div>
					<div className="form-control mb-2">
						<input
							type="text"
							className="input input-bordered"
							placeholder="btcod8r9ds89898...."
							name="network"
							value={data.network}
							onChange={(e) =>
								setData({
									...data,
									[e.target.name]: e.target.value,
								})
							}
						/>
					</div>
					<div className="form-control mb-2">
						<label className="label text-xs">Rate</label>
						<input
							type="number"
							className="input input-bordered"
							placeholder="16000...."
							name="rate"
							value={data.rate}
							onChange={(e) =>
								setData({
									...data,
									[e.target.name]: e.target.value,
								})
							}
						/>
					</div>
					<button
						disabled={isUpdating}
						className="btn btn-primary"
					>
						Save
					</button>
				</form>
			)}
		</div>
	);
}

export default PIWallets;

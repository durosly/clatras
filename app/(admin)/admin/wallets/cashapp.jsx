"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const initialState = { tag: "", phone: "", email: "", fee: "", id: "" };

function CashappWallets() {
	const [data, setData] = useState(initialState);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	async function handleSubmit(e) {
		e.preventDefault();
		if (isUpdating) return;
		const toastId = toast.loading("Updating...");
		try {
			setIsUpdating(true);

			const response = await axios.put(
				"/api/admin/wallets?type=cashapp",
				{
					...data,
				}
			);

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
				const response = await axios(`/api/admin/wallets?type=cashapp`);
				if (response.data.status) {
					const { doc } = response.data;
					setData({
						tag: doc.tag,
						fee: doc.fee,
						id: doc.$id,
						email: doc.email,
						phone: doc.phone,
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
			<h2 className="text-xs">CashApp wallet info</h2>
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
							placeholder="tag...."
							name="tag"
							value={data.tag}
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
							placeholder="phone...."
							name="phone"
							value={data.phone}
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
							type="email"
							className="input input-bordered"
							placeholder="email...."
							name="email"
							value={data.email}
							onChange={(e) =>
								setData({
									...data,
									[e.target.name]: e.target.value,
								})
							}
						/>
					</div>
					<div className="form-control mb-2">
						<label className="label text-xs">Fee</label>
						<input
							type="number"
							className="input input-bordered"
							placeholder="16000...."
							name="fee"
							value={data.fee}
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

export default CashappWallets;

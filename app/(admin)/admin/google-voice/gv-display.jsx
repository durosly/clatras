"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const initialState = {
	bank_name: "",
	account_name: "",
	account_number: "",
	cost: "",
	id: "",
};

function GoogleVoiceDetails() {
	const [data, setData] = useState(initialState);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	async function handleSubmit(e) {
		e.preventDefault();
		if (isUpdating) return;
		const toastId = toast.loading("Updating...");
		try {
			setIsUpdating(true);

			const response = await axios.put("/api/admin/google-voice", data);

			if (response?.data.status) {
				toast.success("Updated", { id: toastId });
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
				const response = await axios(`/api/admin/google-voice`);
				if (response.data.status) {
					const { doc } = response.data;
					setData({
						bank_name: doc.bank_name,
						cost: doc.cost,
						id: doc.$id,
						account_name: doc.account_name,
						account_number: doc.account_number,
					});
					// console.log(doc);
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
			<h2 className="text-xs">Google voice payment info</h2>
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
							placeholder="bank name...."
							name="bank_name"
							value={data.bank_name}
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
							placeholder="account name...."
							name="account_name"
							value={data.account_name}
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
							placeholder="account number...."
							name="account_number"
							inputMode="numeric"
							value={data.account_number}
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
							name="cost"
							inputMode="numeric"
							value={data.cost}
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

export default GoogleVoiceDetails;

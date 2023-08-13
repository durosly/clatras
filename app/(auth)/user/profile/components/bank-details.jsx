"use client";

import { appwriteClient } from "@/lib/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const initialState = {
	bank_name: "",
	account_name: "",
	account_number: "",
};

function BankDetails() {
	const [data, setData] = useState(initialState);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	async function handleSubmit(e) {
		e.preventDefault();
		if (isUpdating) return;
		const toastId = toast.loading("Updating...");
		try {
			setIsUpdating(true);

			const response = await axios.post("/api/bank/create", data);

			if (response?.data.status) {
				toast.success("Account added", { id: toastId });

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
		async function loadBankDetails() {
			try {
				const response = await axios("/api/bank/get-details");
				if (response.data.status) {
					const {
						doc: { account_name, account_number, bank_name },
					} = response.data;
					setData({ bank_name, account_name, account_number });
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

		loadBankDetails();
	}, []);

	return (
		<div className="border p-5 rounded-md">
			<div className="flex gap-2 items-center">
				<h2 className="font-bold">Account details</h2>
			</div>
			<div className="mt-4">
				{isLoading ? (
					<span className="loading loading-ball"></span>
				) : (
					<form onSubmit={handleSubmit}>
						<div className="form-control">
							<label
								htmlFor="bank_name"
								className="label"
							>
								Bank Name
							</label>
							<input
								className="input input-bordered"
								id="bank_name"
								type="text"
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
						<div className="form-control">
							<label
								htmlFor="account_name"
								className="label"
							>
								Account Name
							</label>
							<input
								className="input input-bordered"
								id="account_name"
								type="text"
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
						<div className="form-control">
							<label
								htmlFor="account_number"
								className="label"
							>
								Account Number
							</label>
							<input
								className="input input-bordered"
								id="account_number"
								type="text"
								name="account_number"
								value={data.account_number}
								onChange={(e) =>
									setData({
										...data,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</div>

						<div className="mt-3">
							<button
								disabled={isUpdating}
								className="btn btn-neutral"
							>
								Save
							</button>
						</div>
						<div className="mt-5">
							<p className="text-xs">
								* Ensure to click &apos;save&apos; after making
								any changes
							</p>
							<p className="text-xs">
								* Make sure that all information is accurate
							</p>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}

export default BankDetails;

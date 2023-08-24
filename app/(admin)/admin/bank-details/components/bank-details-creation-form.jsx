"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

const initialData = { bank_name: "", account_name: "", account_number: "" };

function BankDetailsCreationForm() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState(initialData);

	async function sumbitData(e) {
		e.preventDefault();
		if (isLoading) return;

		setIsLoading(true);
		const toastId = toast.loading("creating bank details");
		try {
			const response = await axios.post("/api/admin/bank-details", data);

			toast.success("Successful", { id: toastId });
			setData({ ...initialData });
			router.refresh();
		} catch (error) {
			toast.error(
				error?.response?.data?.message || "Something went wrong",
				{ id: toastId }
			);
		} finally {
			setIsLoading(false);
		}
	}
	return (
		<form onSubmit={sumbitData}>
			<div className="form-control">
				<label
					className="label"
					htmlFor=""
				>
					Bank Name
				</label>
				<input
					type="text"
					className="input input-bordered"
					placeholder="GTB..."
					name="bank_name"
					value={data.bank_name}
					onChange={(e) =>
						setData({ ...data, [e.target.name]: e.target.value })
					}
				/>
			</div>
			<div className="form-control">
				<label
					className="label"
					htmlFor=""
				>
					Account Name
				</label>
				<input
					type="text"
					className="input input-bordered"
					placeholder="John..."
					name="account_name"
					value={data.account_name}
					onChange={(e) =>
						setData({ ...data, [e.target.name]: e.target.value })
					}
				/>
			</div>
			<div className="form-control">
				<label
					className="label"
					htmlFor=""
				>
					Account Number
				</label>
				<input
					type="text"
					className="input input-bordered"
					placeholder="60..."
					name="account_number"
					value={data.account_number}
					onChange={(e) =>
						setData({ ...data, [e.target.name]: e.target.value })
					}
				/>
			</div>
			<button
				disabled={isLoading}
				className="btn btn-primary mt-4"
			>
				Add
			</button>
		</form>
	);
}

export default BankDetailsCreationForm;

"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

const initialData = { name: "", abbr: "", fee: "" };

function PaymentCreationForm() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState(initialData);

	async function sumbitData(e) {
		e.preventDefault();
		if (isLoading) return;

		setIsLoading(true);
		const toastId = toast.loading("creating new account");
		try {
			const response = await axios.post("/api/admin/payments", data);

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
					Name
				</label>
				<input
					type="text"
					className="input input-bordered"
					placeholder="cashapp..."
					name="name"
					value={data.name}
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
					Abbreviation
				</label>
				<input
					type="text"
					className="input input-bordered"
					placeholder="ch..."
					name="abbr"
					value={data.abbr}
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
					Fee($)
				</label>
				<input
					type="text"
					className="input input-bordered"
					placeholder="60..."
					name="fee"
					value={data.fee}
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

export default PaymentCreationForm;

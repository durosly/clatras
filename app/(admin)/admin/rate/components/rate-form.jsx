"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function RateForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [rate, setRate] = useState("");
	const router = useRouter();

	async function createRate(e) {
		e.preventDefault();

		if (isLoading) return;
		const toastId = toast.loading("Setting rate");
		setIsLoading(true);

		try {
			const response = await axios.post("/api/admin/rate", { rate });
			console.log(response);
			toast.success("Done", { id: toastId });
			setRate("");
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
		<form onSubmit={createRate}>
			<div className="form-control max-w-sm mb-2">
				<label
					htmlFor="rate"
					className="label"
				>
					New rate(in naira):
				</label>
				<input
					type="text"
					className="input input-bordered"
					placeholder="New rate..."
					value={rate}
					onChange={(e) => setRate(e.target.value)}
				/>
			</div>
			<button
				disabled={isLoading}
				className="btn btn-primary"
			>
				Save
			</button>
		</form>
	);
}

export default RateForm;

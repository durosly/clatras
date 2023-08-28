"use client";

import axios from "axios";

import { useState } from "react";
import { toast } from "react-hot-toast";

const initialState = {
	name: "",
	network: "",
	address: "",
	rate: "",
	abbr: "",
};

function CreateCryptoForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState(initialState);

	async function createNewToken(e) {
		e.preventDefault();
		if (isLoading) return;
		const toastId = toast.loading("creating...");
		try {
			const response = await axios.post("/api/admin/crypto", data);

			toast.success("Done", { id: toastId });
			setData({ ...initialState });
		} catch (error) {
			console.log(error);
			toast.error(
				error?.response?.data?.message || "Something went wrong",
				{ id: toastId }
			);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<form onSubmit={createNewToken}>
			<div className="form-control">
				<label className="label">Name</label>
				<input
					type="text"
					className="input input-bordered"
					name="name"
					value={data.name}
					onChange={(e) =>
						setData({ ...data, [e.target.name]: e.target.value })
					}
				/>
			</div>
			<div className="form-control">
				<label className="label">Abbreviation</label>
				<input
					type="text"
					className="input input-bordered"
					name="abbr"
					value={data.abbr}
					onChange={(e) =>
						setData({ ...data, [e.target.name]: e.target.value })
					}
				/>
			</div>
			<div className="form-control">
				<label className="label">Network (can be empty)</label>
				<input
					type="text"
					className="input input-bordered"
					name="network"
					value={data.network}
					onChange={(e) =>
						setData({ ...data, [e.target.name]: e.target.value })
					}
				/>
			</div>
			<div className="form-control">
				<label className="label">Address</label>
				<input
					type="text"
					className="input input-bordered"
					name="address"
					value={data.address}
					onChange={(e) =>
						setData({ ...data, [e.target.name]: e.target.value })
					}
				/>
			</div>
			<div className="form-control">
				<label className="label">Retail Rate</label>
				<input
					type="text"
					className="input input-bordered"
					name="rate"
					value={data.rate}
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

export default CreateCryptoForm;

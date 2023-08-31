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

function CreateCryptoForm({ c_list }) {
	const [listType, setListType] = useState("predefined");
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState(initialState);

	async function createNewToken(e) {
		e.preventDefault();
		if (isLoading) return;
		setIsLoading(true);
		const toastId = toast.loading("creating...");
		try {
			const response = await axios.post("/api/admin/crypto", {
				...data,
				type: listType,
			});

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
			<div className="form-control flex-row flex-wrap gap-4">
				<label className="label justify-start gap-2 cursor-pointer">
					<span className="label-text">Custom</span>
					<input
						type="radio"
						name="radio-10"
						className="radio"
						checked={listType === "custom"}
						onChange={() => setListType("custom")}
					/>
				</label>
				<label className="label justify-start gap-2 cursor-pointer">
					<span className="label-text">Predefined</span>
					<input
						type="radio"
						name="radio-10"
						className="radio"
						checked={listType === "predefined"}
						onChange={() => setListType("predefined")}
					/>
				</label>
			</div>

			{listType === "custom" && (
				<>
					<div className="form-control">
						<label className="label">Name</label>
						<input
							type="text"
							className="input input-bordered"
							name="name"
							value={data.name}
							onChange={(e) =>
								setData({
									...data,
									[e.target.name]: e.target.value,
								})
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
								setData({
									...data,
									[e.target.name]: e.target.value,
								})
							}
						/>
					</div>
				</>
			)}
			{listType === "predefined" && (
				<>
					<div className="form-control">
						<label className="label">Currency</label>
						<select
							className="select select-bordered"
							value={data.abbr}
							name="abbr"
							onChange={(e) =>
								setData({
									...data,
									[e.target.name]: e.target.value,
								})
							}
						>
							<option>-- token --</option>
							{c_list.map((c) => (
								<option
									key={c.id}
									value={c.symbol.toLowerCase()}
									onClick={() => {
										setData({
											...data,
											name: c.name,
											rate: 1,
										});
									}}
								>
									{c.name}
								</option>
							))}
						</select>
					</div>
				</>
			)}
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
				<label className="label">Price($)</label>
				<input
					type="text"
					className="input input-bordered"
					name="rate"
					readOnly={listType === "predefined"}
					value={data.rate}
					onChange={(e) =>
						setData({ ...data, [e.target.name]: e.target.value })
					}
				/>
			</div>
			{listType === "predefined" && (
				<p className="text-xs">
					** Price would update automatically after submission**
				</p>
			)}
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

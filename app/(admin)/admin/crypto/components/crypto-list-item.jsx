"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-hot-toast";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { LiaTimesSolid } from "react-icons/lia";

function CryptoListItem({ doc, count }) {
	const router = useRouter();
	const [data, setData] = useState(doc);
	const [showModal, setShowModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const { name, abbr, network, address, rate } = doc;

	async function updateToken(e) {
		e.preventDefault();
		if (isLoading) return;
		const toastId = toast.loading("updating...");
		try {
			const response = await axios.put("/api/admin/crypto", data);

			toast.success("Done", { id: toastId });
			setShowModal(false);
			router.refresh();
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
	async function deleteToken() {
		if (isDeleting) return;
		const toastId = toast.loading("deleting...");
		try {
			const response = await axios.delete(
				`/api/admin/crypto?id=${doc.$id}`,
				data
			);

			toast.success("Done", { id: toastId });

			router.refresh();
		} catch (error) {
			toast.error(
				error?.response?.data?.message || "Something went wrong",
				{ id: toastId }
			);
		} finally {
			setIsDeleting(false);
		}
	}

	return (
		<>
			<tr>
				<th>{count}</th>
				<td>
					{name} ({abbr})
				</td>
				<td>{network ?? "nil"}</td>
				<td>{address}</td>
				<td>{rate}</td>
				<td className="flex gap-2">
					<button
						onClick={() => setShowModal(true)}
						disabled={isDeleting}
						className="btn btn-sm btn-primary btn-square btn-outline"
					>
						<AiOutlineEdit />
					</button>
					<button
						disabled={isDeleting}
						onClick={() => deleteToken()}
						className="btn btn-sm btn-error btn-square btn-outline"
					>
						<BsTrash3 />
					</button>
				</td>
			</tr>
			{showModal &&
				createPortal(
					<dialog className="modal modal-open modal-middle backdrop-blur-sm">
						<div className="modal-box space-y-5">
							<button
								onClick={() => setShowModal(false)}
								disabled={isLoading}
								className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
							>
								<LiaTimesSolid />
							</button>
							<form onSubmit={updateToken}>
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
									<label className="label">
										Abbreviation
									</label>
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
								<div className="form-control">
									<label className="label">
										Network (can be empty)
									</label>
									<input
										type="text"
										className="input input-bordered"
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
								<div className="form-control">
									<label className="label">Address</label>
									<input
										type="text"
										className="input input-bordered"
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
								<div className="form-control">
									<label className="label">Rate($)</label>
									<input
										type="text"
										className="input input-bordered"
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
									disabled={isLoading}
									className="btn btn-primary mt-4"
								>
									Update
								</button>
							</form>

							<div className="mt-12 sm:hidden"></div>
						</div>
					</dialog>,
					document.getElementById("modal-container")
				)}
		</>
	);
}

export default CryptoListItem;

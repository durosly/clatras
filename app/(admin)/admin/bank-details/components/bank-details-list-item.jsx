"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-hot-toast";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { LiaTimesSolid } from "react-icons/lia";

function BankDetailsListItem({ count, doc }) {
	const router = useRouter();
	const [data, setData] = useState(doc);
	const [showModal, setShowModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const { bank_name, account_name, account_number } = doc;

	async function updateToken(e) {
		e.preventDefault();
		if (isLoading) return;
		const toastId = toast.loading("updating...");
		try {
			const response = await axios.put("/api/admin/bank-details", data);

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
				`/api/admin/bank-details?id=${doc.$id}`,
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
				<td>{bank_name}</td>
				<td>{account_name}</td>
				<td>{account_number}</td>
				<td className="flex gap-2">
					<button
						disabled={isDeleting}
						onClick={() => setShowModal(true)}
						className="btn btn-sm btn-primary btn-square btn-outline"
					>
						<AiOutlineEdit />
					</button>
					<button
						disabled={isDeleting}
						onClick={deleteToken}
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
									<label className="label">Bank Name</label>
									<input
										type="text"
										className="input input-bordered"
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
									<label className="label">
										Account Name
									</label>
									<input
										type="text"
										className="input input-bordered"
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
									<label className="label">
										Account Number
									</label>
									<input
										type="text"
										className="input input-bordered"
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

export default BankDetailsListItem;

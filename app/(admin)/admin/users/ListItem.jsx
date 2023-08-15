"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillEye } from "react-icons/ai";
import { BsCheck2 } from "react-icons/bs";
import { LiaTimesSolid } from "react-icons/lia";

function ListItem({ doc, count, update }) {
	const [isLoading, setIsLoading] = useState(false);
	let type = "badge-error";
	if (doc.status) {
		type = "badge-success";
	}

	async function updateState(status) {
		if (isLoading) return;
		const toastId = toast.loading("Updating");
		setIsLoading(true);
		try {
			const response = await axios.post("/api/admin/users", {
				status,
				id: doc.$id,
			});
			if (response.data.status) {
				toast.success("Success", { id: toastId });
				doc.status = status;
				update(doc);
			} else {
				throw new Error(response.data.message);
			}
		} catch (error) {
			toast.error(error.message, { id: toastId });
		} finally {
			setIsLoading(false);
		}
	}
	return (
		<tr>
			<th>{count}</th>
			<td className="whitespace-nowrap">{doc.name}</td>
			<td className="space-x-2">
				{doc.email}, {doc.phone}
			</td>
			<td className="flex items-center gap-2">
				<span className={` badge badge-xs text-xs ${type}`}>
					{doc.status}
				</span>
				<div className="mt-2 flex gap-2">
					<button
						onClick={() => updateState(true)}
						disabled={isLoading || doc.status}
						className="btn btn-primary btn-outline btn-sm btn-square"
					>
						<BsCheck2 />
					</button>
					<button
						onClick={() => updateState(false)}
						disabled={isLoading || !doc.status}
						className="btn btn-error btn-outline btn-sm btn-square"
					>
						<LiaTimesSolid />
					</button>
				</div>
			</td>
			<td className="whitespace-nowrap">
				{new Intl.DateTimeFormat("en-GB", {
					dateStyle: "full",
					timeStyle: "long",
					hour12: true,
				}).format(new Date(doc.$createdAt))}
			</td>
		</tr>
	);
}

export default ListItem;

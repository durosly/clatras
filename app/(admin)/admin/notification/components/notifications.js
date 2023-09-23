"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsPatchCheck, BsTrash3 } from "react-icons/bs";
import { MdWarningAmber } from "react-icons/md";
import { TbSpeakerphone } from "react-icons/tb";
import { VscWarning } from "react-icons/vsc";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());
function AdminNoticeDisplay() {
	const { data, error, isLoading } = useSWR("/api/auth/notice", fetcher, {
		refreshInterval: 1000,
	});

	const alertType = {
		success: "alert-success",
		warning: "alert-warning",
		error: "alert-error",
		info: "alert-info",
	};
	const bg = {
		success: "bg-[#2d884d]",
		warning: "bg-[#fecf6d]",
		error: "bg-[#b34045]",
		info: "bg-[#4091d7]",
	};

	const [isDeleting, setIsDeleting] = useState(false);

	async function deleteNotice(id) {
		if (isDeleting) return;
		const toastId = toast.loading("Deleting...");
		setIsDeleting(true);
		try {
			const response = await axios.delete("/api/admin/notice", {
				params: { id },
			});
			if (response.data.status) {
				toast.success("Deleted successfully", { id: toastId });
			} else {
				throw new Error(response.data.message);
			}
		} catch (error) {
			toast.error(`Deletion failed: ${error.message}`, { id: toastId });
		} finally {
			setIsDeleting(false);
		}
	}

	return (
		<div className="space-y-2">
			{error || isLoading || !data ? (
				<div className="bg-primary/10 p-5 rounded-2xl">
					<h2 className="text-xl font-bold">Welcome to Clatras</h2>
					<p className="text-sm">
						Experience fast and easy transactions
					</p>
				</div>
			) : (
				data.notice.documents.map((n) => (
					<div
						key={n.$id}
						className={`alert ${bg[n.type]} bg-opacity-60 ${
							alertType[n.type]
						}`}
					>
						{n.type === "success" ? (
							<BsPatchCheck className="w-6 h-6" />
						) : n.type === "warning" ? (
							<VscWarning className="w-6 h-6" />
						) : n.type === "error" ? (
							<MdWarningAmber className="w-6 h-6" />
						) : (
							<TbSpeakerphone className="w-6 h-6" />
						)}
						<div>
							<h3 className="font-bold">{n.title}</h3>
							<div className="text-xs">{n.message}</div>
						</div>
						<button
							disabled={isDeleting}
							onClick={() => deleteNotice(n.$id)}
							className="btn btn-sm btn-error"
						>
							<BsTrash3 />
						</button>
					</div>
				))
			)}
		</div>
	);
}

export default AdminNoticeDisplay;

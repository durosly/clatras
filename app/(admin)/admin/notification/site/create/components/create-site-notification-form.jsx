"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

function CreateSiteNotificationForm() {
	const [data, setData] = useState({
		title: "",
		message: "",
		type: "success",
		expires_at: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	async function addNotice(e) {
		e.preventDefault();
		if (isLoading) return;
		const toastId = toast.loading("creating...");
		try {
			setIsLoading(true);

			const response = await axios.post("/api/admin/notice", data);
			if (response.data.status) {
				toast.success("Created successfully", { id: toastId });
				setData({
					title: "",
					message: "",
					type: "success",
					expires_at: "",
				});
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
		<form onSubmit={addNotice}>
			<div className="form-control">
				<label className="label">Title</label>
				<input
					type="text"
					className="input input-bordered"
					value={data.title}
					name="title"
					onChange={(e) =>
						setData({ ...data, [e.target.name]: e.target.value })
					}
				/>
			</div>
			<div className="form-control">
				<label className="label">message</label>
				<input
					type="text"
					className="input input-bordered"
					value={data.message}
					name="message"
					onChange={(e) =>
						setData({ ...data, [e.target.name]: e.target.value })
					}
				/>
			</div>
			<div className="form-control">
				<label className="label">Type</label>
				<select
					className="select select-bordered"
					value={data.type}
					name="type"
					onChange={(e) =>
						setData({ ...data, [e.target.name]: e.target.value })
					}
				>
					<option value="success">Success</option>
					<option value="warning">Warning</option>
					<option value="info">Info</option>
					<option value="error">Danger</option>
				</select>
			</div>
			<div className="form-control mb-2">
				<label className="label">Expires At</label>
				<input
					type="datetime-local"
					className="input input-bordered"
					value={data.expires_at}
					name="expires_at"
					onChange={(e) =>
						setData({ ...data, [e.target.name]: e.target.value })
					}
				/>
			</div>
			<button
				disabled={isLoading}
				className="btn btn-primary"
			>
				create
			</button>
		</form>
	);
}

export default CreateSiteNotificationForm;

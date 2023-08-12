"use client";

import { appwriteClient } from "@/lib/client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const initialState = {
	old_password: "",
	password: "",
};

function PasswordUpdate() {
	const [isVisible, setIsVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState(initialState);

	async function handleSubmit(e) {
		e.preventDefault();
		if (isLoading) return;
		const toastId = toast.loading("Updating...");
		try {
			setIsLoading(true);

			const account = await appwriteClient.changePassword(
				data.password,
				data.old_password
			);

			if (account) {
				toast.success("Password updated", { id: toastId });

				setData({ ...initialState });
			} else {
				throw new Error("invalid credentials");
			}
		} catch (error) {
			toast.error(error.message, { id: toastId });
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="border p-5 rounded-md">
			<div className="flex gap-2 items-center">
				<h2 className="font-bold">Update Password</h2>
			</div>
			<div className="mt-4">
				<form onSubmit={handleSubmit}>
					<div className="form-control">
						<label
							htmlFor="old_password"
							className="label"
						>
							Old password
						</label>
						<input
							className="input input-bordered"
							id="old_password"
							type={isVisible ? "text" : "password"}
							name="old_password"
							value={data.old_password}
							onChange={(e) =>
								setData({
									...data,
									[e.target.name]: e.target.value,
								})
							}
						/>
					</div>
					<div className="form-control">
						<label
							htmlFor="password"
							className="label"
						>
							New password
						</label>
						<input
							className="input input-bordered"
							id="password"
							type={isVisible ? "text" : "password"}
							name="password"
							value={data.password}
							onChange={(e) =>
								setData({
									...data,
									[e.target.name]: e.target.value,
								})
							}
						/>
					</div>
					<div className="text-right">
						<button
							type="button"
							className="btn btn-xs btn-ghost"
							onClick={() => setIsVisible((prev) => !prev)}
						>
							{isVisible ? (
								<AiOutlineEyeInvisible className="w-5 h-5" />
							) : (
								<AiOutlineEye className="w-5 h-5" />
							)}
						</button>
					</div>
					<div className="mt-3">
						<button
							disabled={
								isLoading ||
								!data.old_password ||
								!data.password
							}
							className="btn btn-neutral"
						>
							Update
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default PasswordUpdate;

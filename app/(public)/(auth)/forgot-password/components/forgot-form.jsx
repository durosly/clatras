"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { appwriteClient } from "@/lib/client";

function ForgotForm() {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	async function sendEmail(e) {
		e.preventDefault();
		if (isLoading) return;
		const toastId = toast.loading("Sending reset email...");
		setIsLoading(true);
		try {
			if (!email) throw new Error("Enter your email address");

			await appwriteClient.sendPasswordRecoveryEmail(email);

			toast.success("Verification email sent", { id: toastId });
		} catch (error) {
			toast.error(error.message, { id: toastId });
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<form onSubmit={sendEmail}>
			<div className="form-control">
				<label
					htmlFor="email"
					className="label"
				>
					Email
				</label>
				<input
					type="email"
					name="email"
					id="email"
					className="input input-bordered"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className="mt-3">
				<button
					disabled={isLoading}
					className="btn btn-primary btn-block"
				>
					{!isLoading ? (
						"Submit"
					) : (
						<>
							<span className="loading loading-spinner"></span>
							Loading
						</>
					)}
				</button>
			</div>
		</form>
	);
}

export default ForgotForm;

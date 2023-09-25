"use client";
import { useState } from "react";
import { Client, Account } from "appwrite";
import toast from "react-hot-toast";

function ForgotForm() {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [retry, setRetry] = useState(false);

	const client = new Client();

	const account = new Account(client);

	const url = new URL(`${process.env.NEXT_PUBLIC_URL}/forgot-password/reset`);

	client
		.setEndpoint(process.env.NEXT_PUBLIC_APPRWRITE_ENDPOINT) // Your API Endpoint
		.setProject(process.env.NEXT_PUBLIC_APPRWRITE_PROJECT_ID); // Your project ID

	async function sendEmail(e) {
		e.preventDefault();
		if (isLoading) return;
		const toastId = toast.loading("Sending reset email...");
		setIsLoading(true);
		try {
			if (!email) throw new Error("Enter your email address");
			await account.createRecovery(email, url.href);

			toast.success("Verification email sent", { id: toastId });
		} catch (error) {
			toast.error(error.message, { id: toastId });
		} finally {
			setIsLoading(false);
		}
	}
	return (
		<form
			onSubmit={sendEmail}
			action="/forgot-password"
		>
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

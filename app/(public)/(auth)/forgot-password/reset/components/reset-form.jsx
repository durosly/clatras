"use client";
import { useState } from "react";
import { Client, Account } from "appwrite";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function ResetForm() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const userId = searchParams.get("userId");
	const secret = searchParams.get("secret");

	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");
	const [togglePassowrd, setTogglePassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const client = new Client();

	const account = new Account(client);

	client
		.setEndpoint(process.env.NEXT_PUBLIC_APPRWRITE_ENDPOINT) // Your API Endpoint
		.setProject(process.env.NEXT_PUBLIC_APPRWRITE_PROJECT_ID); // Your project ID

	async function updatePassword(e) {
		e.preventDefault();
		if (isLoading) return;
		const toastId = toast.loading("Resetting password...");
		setIsLoading(true);
		try {
			if (!password || !rePassword) throw new Error("Enter all fields");
			await account.updateRecovery(userId, secret, password, rePassword);

			toast.success(
				"Password updated. You can now login with new password",
				{ id: toastId }
			);
			setTimeout(() => router.replace("/login"), 3000);
		} catch (error) {
			toast.error(error.message, { id: toastId });
		} finally {
			setIsLoading(false);
		}
	}
	return (
		<form
			onSubmit={updatePassword}
			action="/forgot-password"
		>
			<div className="form-control">
				<label
					htmlFor="password"
					className="label"
				>
					New Password
				</label>
				<input
					type={togglePassowrd ? "text" : "password"}
					name="password"
					id="password"
					className="input input-bordered"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<div className="form-control">
				<label
					htmlFor="re_password"
					className="label"
				>
					Re: New Password
				</label>
				<input
					type={togglePassowrd ? "text" : "password"}
					name="password"
					id="re_password"
					className="input input-bordered"
					value={rePassword}
					onChange={(e) => setRePassword(e.target.value)}
				/>
			</div>
			<div className="text-right mt-2">
				<button
					type="button"
					className="btn btn-xs btn-ghost"
					onClick={() => setTogglePassword((prev) => !prev)}
				>
					{togglePassowrd ? (
						<AiOutlineEyeInvisible className="w-5 h-5 opacity-70" />
					) : (
						<AiOutlineEye className="w-5 h-5 opacity-70" />
					)}
				</button>
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

export default ResetForm;

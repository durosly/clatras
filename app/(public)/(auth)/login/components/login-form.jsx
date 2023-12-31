"use client";
import { appwriteClient } from "@/lib/client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { BiEnvelope, BiLock } from "react-icons/bi";

const initialState = {
	email: "",
	password: "",
};

function LoginForm() {
	const [data, setData] = useState(initialState);
	const [isLoading, setIsLoading] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const router = useRouter();

	async function handleSubmit(e) {
		e.preventDefault();
		if (isLoading) return;
		const toastId = toast.loading("Loading...");
		try {
			setIsLoading(true);

			const account = await appwriteClient.loginUser(
				data.email,
				data.password
			);

			if (account) {
				const token = await appwriteClient.getJWT();
				const res = await signIn("credentials", {
					redirect: false,
					token: token?.jwt || null,
				});

				if (res && res?.ok) {
					router.push("/user");
					// setIsLoading(false);
					toast.success("Login successful", { id: toastId });
					// setData({ ...initialState });
				} else {
					throw new Error(res.error);
				}
			} else {
				throw new Error("invalid credentials");
			}
		} catch (error) {
			console.log(error);
			let message = "Invalid credentials";

			toast.error(message, { id: toastId });
			setIsLoading(false);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-control ">
				<label className="label">
					<span className="label-text">E-mail</span>
				</label>
				<div className="relative">
					<BiEnvelope className="absolute top-1/2 -translate-y-1/2 w-5 h-5 left-3 fill-current opacity-70" />
					<input
						type="email"
						placeholder="E-mail..."
						className="input input-bordered w-full pl-10"
						name="email"
						value={data.email}
						onChange={(e) =>
							setData({
								...data,
								[e.target.name]: e.target.value,
							})
						}
					/>
				</div>
			</div>
			<div className="form-control ">
				<label className="label">
					<span className="label-text">Password</span>
				</label>
				<div className="relative">
					<BiLock className="absolute top-1/2 -translate-y-1/2 w-5 h-5 left-3 fill-current opacity-70" />
					<input
						type={isVisible ? "text" : "password"}
						placeholder="Password..."
						className="input input-bordered w-full pl-10"
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
				<div className="text-right mt-2">
					<button
						type="button"
						className="btn btn-xs btn-ghost"
						onClick={() => setIsVisible((prev) => !prev)}
					>
						{isVisible ? (
							<AiOutlineEyeInvisible className="w-5 h-5 opacity-70" />
						) : (
							<AiOutlineEye className="w-5 h-5 opacity-70" />
						)}
					</button>
				</div>
			</div>
			<div className="mt-5">
				<button
					disabled={isLoading}
					className="btn btn-primary sm:btn-block"
				>
					Log in
				</button>
			</div>
		</form>
	);
}

export default LoginForm;

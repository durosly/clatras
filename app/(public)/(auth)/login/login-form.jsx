"use client";
import { appwriteClient } from "@/lib/client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

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
				toast.success("Login successful", { id: toastId });

				// const token = await appwriteClient.getJWT();
				// // console.log(token);
				setCookie(
					process.env.NEXT_PUBLIC_COOKIE_AUTH_KEY,
					account.userId,
					{
						path: "/user",
						domain: "localhost",
						maxAge: 60 * 60 * 24,
					}
				);
				// console.log(account);
				router.push("/user");
				setData({ ...initialState });
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
				<input
					type="email"
					placeholder="E-mail..."
					className="input input-bordered w-full"
					name="email"
					value={data.email}
					onChange={(e) =>
						setData({ ...data, [e.target.name]: e.target.value })
					}
				/>
			</div>
			<div className="form-control ">
				<label className="label">
					<span className="label-text">Password</span>
				</label>
				<input
					type={isVisible ? "text" : "password"}
					placeholder="Password..."
					className="input input-bordered w-full"
					name="password"
					value={data.password}
					onChange={(e) =>
						setData({ ...data, [e.target.name]: e.target.value })
					}
				/>
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

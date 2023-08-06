"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const initialState = {
	email: "",
	password: "",
};

function LoginForm() {
	const [data, setData] = useState(initialState);
	const [isLoading, setIsLoading] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		if (isLoading) return;
		const toastId = toast.loading("Loading...");
		try {
			setIsLoading(true);

			const res = await signIn("credentials", {
				redirect: false,
				...data,
			});

			if (res?.ok && !res.error) {
				toast.success("Login successful", { id: toastId });
				setData({ ...initialState });
			} else {
				throw new Error(res?.error);
			}
		} catch (error) {
			let message = "Something went wrong";

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
					type="password"
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

"use client";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiEnvelope, BiLock, BiPhone, BiUser } from "react-icons/bi";

const initialState = {
	name: "",
	email: "",
	password: "",
	phonenumber: "",
};

function SignupForm() {
	const [data, setData] = useState(initialState);
	const [isLoading, setIsLoading] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		if (isLoading) return;
		const toastId = toast.loading("Loading...");
		try {
			setIsLoading(true);
			const response = await axios.post("/api/auth/signup", data);

			if (response.data.status === true) {
				toast.success(response.data.message, { id: toastId });
				setData({ ...initialState });
			} else {
				throw new Error(response.data.message);
			}
		} catch (error) {
			let message = "Something went wrong";

			if (error instanceof AxiosError) {
				message = error?.response?.data.message;
			}
			toast.error(message, { id: toastId });
		} finally {
			setIsLoading(false);
		}
	}
	return (
		<form onSubmit={handleSubmit}>
			<div className="form-control ">
				<label className="label">
					<span className="label-text">Full name</span>
				</label>
				<div className="relative">
					<BiUser className="absolute top-1/2 -translate-y-1/2 w-5 h-5 left-3 fill-current opacity-70" />
					<input
						type="text"
						placeholder="Full name..."
						className="input input-bordered w-full pl-10"
						name="name"
						value={data.name}
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
					<span className="label-text">Phonenumber</span>
				</label>
				<div className="relative">
					<BiPhone className="absolute top-1/2 -translate-y-1/2 w-5 h-5 left-3 fill-current opacity-70" />
					<input
						type="tel"
						placeholder="Phonenumber..."
						className="input input-bordered w-full pl-10"
						name="phonenumber"
						value={data.phonenumber}
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
					Signup
				</button>
			</div>
		</form>
	);
}

export default SignupForm;

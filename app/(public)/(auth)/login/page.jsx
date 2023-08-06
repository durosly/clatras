import Link from "next/link";
import { AiOutlineEye } from "react-icons/ai";

function LoginPage() {
	return (
		<div>
			<h1 className="text-2xl font-bold text-center mb-5">Login page</h1>
			<form>
				<div className="form-control ">
					<label className="label">
						<span className="label-text">E-mail</span>
					</label>
					<input
						type="email"
						placeholder="E-mail..."
						className="input input-bordered w-full"
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
					/>
					<div className="text-right">
						<button
							type="button"
							className="btn btn-xs btn-ghost"
						>
							<AiOutlineEye />
						</button>
					</div>
				</div>
				<div className="mt-5">
					<button className="btn btn-primary sm:btn-block">
						Log in
					</button>
				</div>
			</form>
			<p className="mt-5">
				Don&apos;t have an account?{" "}
				<Link
					className="link link-primary"
					href="/signup"
				>
					Signup
				</Link>
			</p>
		</div>
	);
}

export default LoginPage;

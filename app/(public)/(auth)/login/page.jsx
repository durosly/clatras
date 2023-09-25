import Link from "next/link";
import LoginForm from "./components/login-form";

function LoginPage() {
	return (
		<div>
			<h1 className="text-2xl font-bold text-center mb-5">Login page</h1>
			<LoginForm />

			<p className="my-5">
				Don&apos;t have an account?{" "}
				<Link
					className="link link-primary"
					href="/signup"
				>
					Signup
				</Link>
			</p>
			<p className="text-center">
				<Link
					href="/forgot-password"
					className="link link-hover font-bold"
				>
					Forgot password?
				</Link>
			</p>
		</div>
	);
}

export default LoginPage;

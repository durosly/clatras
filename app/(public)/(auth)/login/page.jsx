import Link from "next/link";
import { AiOutlineEye } from "react-icons/ai";
import LoginForm from "./login-form";

function LoginPage() {
	return (
		<div>
			<h1 className="text-2xl font-bold text-center mb-5">Login page</h1>
			<LoginForm />
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

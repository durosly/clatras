import Link from "next/link";
import SignupForm from "./form";

function SignupPage() {
	return (
		<div>
			<h1 className="text-2xl font-bold text-center mb-5">Signup</h1>
			<SignupForm />
			<p className="mt-5">
				Already have an account?{" "}
				<Link
					className="link link-primary"
					href="/login"
				>
					Login
				</Link>
			</p>
		</div>
	);
}

export default SignupPage;

import FancyUnderline from "@/svg/illustrations/fancy-underline";
import Link from "next/link";

function ZelleServicePage() {
	return (
		<div className="max-w-3xl mx-5 sm:mx-10 md:mx-auto px-5 py-10 mt-10 bg-primary rounded-md">
			<div className="text-center">
				<h1 className="text-3xl inline-block font-bold text-center relative mb-10">
					Zelle{" "}
					<FancyUnderline className="h-5 absolute fill-slate-600 -bottom-4 right-0" />
				</h1>
			</div>
			<div className="space-y-4">
				<p>
					Zelle is a United States–based digital payments network run
					by a private financial services company owned by the banks
					Bank of America, Truist, Capital One, JPMorgan Chase, PNC
					Bank, U.S. Bank, and Wells Fargo
				</p>
				<p>With us, you can easily fund your Zelle account</p>
				<p>
					<Link
						className="link link-neutral"
						href="/signup"
					>
						Signup
					</Link>{" "}
					now and see how easy it is to work with us
				</p>
			</div>
		</div>
	);
}

export default ZelleServicePage;

import FancyUnderline from "@/svg/illustrations/fancy-underline";
import Link from "next/link";

function BitcoinServicePage() {
	return (
		<div className="max-w-3xl mx-5 sm:mx-10 md:mx-auto px-5 py-10 mt-10 bg-primary rounded-md">
			<div className="text-center">
				<h1 className="text-3xl inline-block font-bold text-center relative mb-10">
					Bitcoin{" "}
					<FancyUnderline className="h-5 absolute fill-slate-600 -bottom-4 right-0" />
				</h1>
			</div>
			<div className="space-y-4">
				<p>
					Bitcoin is a protocol which implements a public, permanent,
					and decentralized ledger. Bitcoin transactions are verified
					by network nodes through cryptography and recorded in a
					public distributed ledger called a blockchain
				</p>
				<p>
					We pride ourselves with helping people acquire bitcoin or
					exchange it for fiat easily
				</p>
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

export default BitcoinServicePage;

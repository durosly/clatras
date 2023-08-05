import FancyUnderline from "@/svg/illustrations/fancy-underline";

function TermsPage() {
	return (
		<div className="max-w-3xl mx-5 sm:mx-10 md:mx-auto px-5 py-10 mt-10 bg-primary rounded-md">
			<div className="text-center">
				<h1 className="text-3xl inline-block font-bold text-center relative mb-10">
					Terms and Conditions{" "}
					<FancyUnderline className="h-5 absolute fill-slate-600 -bottom-4 right-0" />
				</h1>
			</div>
			<ul className="list-disc list-inside space-y-2">
				<li>
					Always check/refresh for change of addresses/tags/details
					before initiating transactions
				</li>
				<li>
					Always input your full legal accounts/details before
					checkout for payments
				</li>
				<li>DO NOT summit order except payment has been sent</li>
				<li>
					Note:When bank errors/network occurs, payments may arrive
					late
				</li>
				<li>
					A 12% charge is applied to wrong terminal/port transactions
				</li>
				<li>
					Funds are calculated using amount sent/received X (times)
					rate published.
				</li>
				<li>
					(Doesn&apos;t apply to Apple E-code,Amazon E-code,
					Registration numbers and Google VC) e.g rate published=757
				</li>
				<li>Average transaction duration:12–25mins</li>
				<li>
					Clatras is NOT liable for any mismanagement/loss of funds.
				</li>
			</ul>
		</div>
	);
}

export default TermsPage;

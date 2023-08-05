import FancyUnderline from "@/svg/illustrations/fancy-underline";

function AboutUsPage() {
	return (
		<div className="max-w-3xl mx-5 sm:mx-10 md:mx-auto px-5 py-10 mt-10 bg-primary rounded-md">
			<div className="text-center">
				<h1 className="text-3xl inline-block font-bold text-center relative mb-10">
					About Us{" "}
					<FancyUnderline className="h-5 absolute fill-slate-600 -bottom-4 right-0" />
				</h1>
			</div>
			<p>
				Clatras is a transaction solution entity that is independent in
				providing a fast, reliable and effective exchange services such
				as digital currencies like Bitcoin, Gift cards, Funds, Apple
				E-code Etc.
			</p>
		</div>
	);
}

export default AboutUsPage;

import FancyUnderline from "@/svg/illustrations/fancy-underline";
import { FaTelegram, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function ContactUsPage() {
	return (
		<div className="max-w-3xl mx-5 sm:mx-10 md:mx-auto px-5 py-10 mt-10 bg-primary rounded-md">
			<div className="text-center">
				<h1 className="text-3xl inline-block font-bold text-center relative mb-10">
					Contact Us{" "}
					<FancyUnderline className="h-5 absolute fill-slate-600 -bottom-4 right-0" />
				</h1>
			</div>
			<div className="grid grid-flow-col gap-4">
				<a
					href="https://twitter.com/Transact"
					target="_blank"
					className="flex flex-col items-center"
				>
					<FaTwitter className="w-5 h-5" />
					<span>Twitter</span>
				</a>
				<a
					href="https://t.me/officialclatras"
					target="_blank"
					className="flex flex-col items-center"
				>
					<FaTelegram className="w-5 h-5" />
					<span>Telegram</span>
				</a>
				<a
					href="mailto:clatras@ccmail.uk"
					target="_blank"
					className="flex flex-col items-center"
				>
					<MdEmail className="w-5 h-5" />
					<span>E-mail</span>
				</a>
			</div>
		</div>
	);
}

export default ContactUsPage;

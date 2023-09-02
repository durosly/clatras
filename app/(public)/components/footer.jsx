import logo from "@/images/logo.png";
import Image from "next/image";
import { FaTelegram, FaTwitter } from "react-icons/fa";
import { MdEmail, MdLocationPin } from "react-icons/md";

function Footer() {
	return (
		<footer className="footer footer-center p-10 ">
			<div>
				<div className="w-10 h-10 relative">
					<Image
						src={logo}
						alt=""
						placeholder="blur"
						fill
					/>
				</div>
				<p className="flex flex-col">
					<span className="font-bold">Clatras Ltd.</span>
					<span>A subsidiary of Clagk</span>
				</p>
				<p className="flex items-center">
					<MdLocationPin />
					<span>27 Lil Mak don Avenue 17 dada</span>
				</p>
				<p className="font-bold">Providing reliable service</p>
				<p>Copyright © 2023 - All right reserved</p>
			</div>
			<div>
				<div className="grid grid-flow-col gap-4">
					<a
						href="https://twitter.com/clatrasteam"
						target="_blank"
					>
						<FaTwitter className="w-5 h-5" />
					</a>
					<a
						href="https://t.me/officialclatras"
						target="_blank"
					>
						<FaTelegram className="w-5 h-5" />
					</a>
					<a
						href="mailto:clatras@ccmail.uk"
						target="_blank"
					>
						<MdEmail className="w-5 h-5" />
					</a>
				</div>
			</div>
		</footer>
	);
}

export default Footer;

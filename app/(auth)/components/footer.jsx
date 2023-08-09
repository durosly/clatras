import Link from "next/link";
import { HiOutlineHome } from "react-icons/hi";
import { MdNotificationsNone } from "react-icons/md";
import { LiaUser } from "react-icons/lia";
import { LuSettings } from "react-icons/lu";

function Footer() {
	return (
		<>
			<div className="mt-20 md:hidden"></div>
			<div className="btm-nav btm-nav-sm border-t md:hidden">
				<Link href="/user">
					<HiOutlineHome className="h-5 w-5" />
				</Link>

				<Link href="/user">
					<LiaUser className="h-5 w-5" />
				</Link>
				<Link href="/notification">
					<MdNotificationsNone className="h-5 w-5" />
				</Link>
				<Link href="/user">
					<LuSettings className="h-5 w-5" />
				</Link>
			</div>
		</>
	);
}

export default Footer;

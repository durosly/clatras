"use client";
import Link from "next/link";
import { HiOutlineHome } from "react-icons/hi";
import { BsArrowRepeat } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { usePathname } from "next/navigation";
function BottomNav() {
	const pathname = usePathname();

	return (
		<>
			<div className="mt-16 sm:hidden"></div>
			<div className="btm-nav h-14 border-t sm:hidden">
				<Link
					href={"/user"}
					className={pathname === "/user" ? "active" : ""}
				>
					<HiOutlineHome className="h-5 w-5" />
					<span className="btm-nav-label text-[10px]">Home</span>
				</Link>
				<Link
					href={"/user/transactions"}
					className={
						pathname === "/user/transactions" ? "active" : ""
					}
				>
					<BsArrowRepeat className="h-5 w-5" />
					<span className="btm-nav-label text-[10px]">History</span>
				</Link>
				<Link
					href={"/user/profile"}
					className={pathname === "/user/profile" ? "active" : ""}
				>
					<AiOutlineUser className="h-5 w-5" />
					<span className="btm-nav-label text-[10px]">Profile</span>
				</Link>
			</div>
		</>
	);
}

export default BottomNav;

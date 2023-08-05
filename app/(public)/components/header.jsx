import Image from "next/image";
import Nav from "./nav";
import logo from "@/images/logo.png";
import Link from "next/link";

function Header() {
	return (
		<div className="w-full navbar border-b">
			<div className="flex-none lg:hidden">
				<label
					htmlFor="my-drawer-3"
					className="btn btn-square btn-ghost"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="inline-block w-6 h-6 stroke-current"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>
				</label>
			</div>

			<Link
				className="flex-1 flex px-2 mx-2"
				href="/"
			>
				<div className="w-5 h-5 relative">
					<Image
						src={logo}
						alt=""
						placeholder="blur"
						fill
					/>
				</div>
				<div>Clatras</div>
			</Link>

			<div className="flex-none hidden lg:block">
				<ul className="menu menu-horizontal">
					{/* Navbar menu content here */}
					<Nav />
				</ul>
			</div>
		</div>
	);
}

export default Header;

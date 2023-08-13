import Image from "next/image";
import Nav from "./nav";
import logo from "@/images/logo.png";
import Link from "next/link";
import ProfileImgDisplay from "../user/profile/components/profile-img-display";

function Header() {
	return (
		<div className="w-full navbar border-b">
			<div className="navbar-start">
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
					className="flex-1 flex items-center gap-1 px-2 mx-2"
					href="/user"
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
			</div>

			{/* <div className="navbar-center flex-none hidden lg:block">
				<ul className="menu menu-horizontal">
					Navbar menu content here
					<Nav />
				</ul>
			</div> */}

			<div className="navbar-end">
				<div className="dropdown dropdown-end">
					<label
						tabIndex={0}
						className="btn btn-ghost btn-circle avatar"
					>
						<ProfileImgDisplay />
					</label>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
					>
						<Nav />
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Header;

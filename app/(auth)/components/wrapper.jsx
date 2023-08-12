import logo from "@/images/logo.png";
import Image from "next/image";
import Footer from "./footer";
import Header from "./header";
import Nav from "./nav";

function Wrapper({ children }) {
	return (
		<>
			<div className="drawer block">
				<input
					id="my-drawer-3"
					type="checkbox"
					className="drawer-toggle"
				/>
				<div className="drawer-content">
					{/* Navbar */}
					<Header />
					{/* Page content here */}
					{children}

					{/* footer */}
					{/* <Footer /> */}
				</div>
				<div className="drawer-side">
					<label
						htmlFor="my-drawer-3"
						className="drawer-overlay"
					></label>

					<ul className="menu p-4 w-80 h-full bg-base-200">
						{/* Sidebar content here */}
						<li className="menu-title flex flex-row items-center gap-2">
							<div className="w-8 h-8 relative">
								<Image
									src={logo}
									alt=""
									placeholder="blur"
									fill
								/>
							</div>
							<div>Clatras</div>
						</li>
						<Nav />
					</ul>
				</div>
			</div>
			<div id="modal-container"></div>
		</>
	);
}

export default Wrapper;

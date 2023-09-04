import Link from "next/link";

function Nav() {
	return (
		<>
			<li>
				<details className="z-50">
					<summary>Services</summary>
					<ul>
						<li>
							<Link
								className="whitespace-nowrap"
								href="/services/bitcoin"
							>
								Bitcoin
							</Link>
						</li>
						<li>
							<Link
								className="whitespace-nowrap"
								href="/services/zelle"
							>
								Zelle
							</Link>
						</li>
						{/* <li>
							<Link
								className="whitespace-nowrap"
								href="/nice"
							>
								PI coin
							</Link>
						</li>
						<li>
							<Link
								className="whitespace-nowrap"
								href="/nice"
							>
								Google Voice
							</Link>
						</li>
						<li>
							<Link
								className="whitespace-nowrap"
								href="/nice"
							>
								USDT
							</Link>
						</li>
						<li>
							<Link
								className="whitespace-nowrap"
								href="/nice"
							>
								Gift cards
							</Link>
						</li> */}
					</ul>
				</details>
			</li>
			<li>
				<Link
					className="whitespace-nowrap"
					href="/about-us"
				>
					About
				</Link>
			</li>
			<li>
				<Link
					className="whitespace-nowrap"
					href="/terms"
				>
					Terms
				</Link>
			</li>
			<li>
				<Link
					className="whitespace-nowrap"
					href="/contact-us"
				>
					Contact
				</Link>
			</li>
			<li className="">
				<Link
					className="bg-primary"
					href="/login"
				>
					Log in
				</Link>
			</li>
		</>
	);
}

export default Nav;

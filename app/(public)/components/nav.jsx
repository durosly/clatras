import Link from "next/link";

function Nav() {
	return (
		<>
			<li>
				<details>
					<summary>Services</summary>
					<ul>
						<li>
							<Link
								className="whitespace-nowrap"
								href="/nice"
							>
								Bitcoin
							</Link>
						</li>
						<li>
							<Link
								className="whitespace-nowrap"
								href="/nice"
							>
								Zelle
							</Link>
						</li>
						<li>
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
						</li>
					</ul>
				</details>
			</li>
			<li>
				<Link
					className="whitespace-nowrap"
					href="/nice"
				>
					About
				</Link>
			</li>
			<li>
				<Link
					className="whitespace-nowrap"
					href="/nice"
				>
					Terms
				</Link>
			</li>
			<li>
				<Link
					className="whitespace-nowrap"
					href="/nice"
				>
					Contact
				</Link>
			</li>
			<li className="">
				<Link
					className="bg-primary"
					href="/nice"
				>
					Log in
				</Link>
			</li>
		</>
	);
}

export default Nav;

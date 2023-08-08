import LogoutButton from "./logout-btn";

function Nav() {
	return (
		<>
			<li>
				<a className="justify-between">
					Profile
					<span className="badge">New</span>
				</a>
			</li>
			<li>
				<a>Settings</a>
			</li>
			<li>
				<LogoutButton />
			</li>
		</>
	);
}

export default Nav;

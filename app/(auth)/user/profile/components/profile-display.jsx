"use client";

import { FaUser } from "react-icons/fa";

function ProfileDisplay() {
	return (
		<div className="border p-5 rounded-md">
			<div className="flex gap-2 items-center">
				<span className="w-8 aspect-square rounded-full flex justify-center items-center">
					<FaUser className="w-5 h-5" />
				</span>
				<h2 className="font-bold">Profile</h2>
			</div>
			<div className="mt-4">
				<div className="flex justify-between flex-wrap gap-2">
					<div>
						<h2>Albert Duro</h2>
						<p>Joined: Aug 9, 2023, 23:47</p>
					</div>
					<div>
						<p>slyboydon1@gmail.com, 23463069903</p>
						<span className="badge badge-neutral">Unverified</span>
					</div>
				</div>
				<div className="mt-2">
					<button className="btn btn-neutral">Verify Account</button>
				</div>
			</div>
		</div>
	);
}

export default ProfileDisplay;

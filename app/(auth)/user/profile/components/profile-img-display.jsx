"use client";

import client from "@/lib/client";
import { Avatars } from "appwrite";

function ProfileImgDisplay() {
	const avatars = new Avatars(client);

	return (
		<div className="w-10 rounded-full">
			<img src={avatars.getInitials()} />
		</div>
	);
}

export default ProfileImgDisplay;

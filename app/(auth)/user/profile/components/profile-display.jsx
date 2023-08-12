"use client";
import { appwriteClient } from "@/lib/client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import ProfileImgDisplay from "./profile-img-display";

function ProfileDisplay() {
	const [user, setUser] = useState(null);
	const [isSending, setIsSending] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		async function loadProfile() {
			try {
				const account = await appwriteClient.getCurrentUser();
				if (account) {
					setUser(account);
				}
				// console.log(account);
			} catch (error) {
				toast.error(error.message);
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		}

		loadProfile();
	}, []);

	async function sendEmail() {
		try {
			if (isSending) return;

			setIsSending(true);

			const token = await appwriteClient.sendVerificationEmail();

			toast.success("email sent");
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsSending(false);
		}
	}

	return (
		<div className="border p-5 rounded-md">
			<div className="flex gap-2 items-center">
				<span className="w-8 aspect-square rounded-full flex justify-center items-center">
					<FaUser className="w-5 h-5" />
				</span>
				<h2 className="font-bold">Profile</h2>
			</div>
			{isLoading ? (
				<span className="loading loading-ball"></span>
			) : (
				user && (
					<div className="mt-4">
						<div className="flex justify-between flex-wrap gap-2">
							<div className="flex gap-2 items-center">
								<div className=" avatar">
									<ProfileImgDisplay />
								</div>
								<h2 className="text-xl">{user.name}</h2>
							</div>
							<div className="space-y-2">
								<p>
									{user.email}, {user.phone}
								</p>
								<span className="badge badge-neutral">
									{user.emailVerification
										? "Verified"
										: "Unverified"}
								</span>
								<p className="text-xs">
									Joined:{" "}
									{new Intl.DateTimeFormat("en-GB", {
										dateStyle: "full",
										timeStyle: "long",
										hour12: true,
									}).format(new Date(user.registration))}
								</p>
							</div>
						</div>
						{!user.emailVerification && (
							<div className="mt-2">
								<button
									disabled={isSending}
									className="btn btn-neutral"
									onClick={sendEmail}
								>
									{isSending ? (
										<span className="loading loading-dots"></span>
									) : (
										"Verify Account"
									)}
								</button>
							</div>
						)}
					</div>
				)
			)}
		</div>
	);
}

export default ProfileDisplay;

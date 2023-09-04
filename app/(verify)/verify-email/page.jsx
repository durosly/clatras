"use client";

import { appwriteClient } from "@/lib/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineEmail, MdOutlineMarkEmailRead } from "react-icons/md";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

function VerifyEmailAddressPage({ searchParams }) {
	const [isLoading, setIsLoading] = useState(false);
	const [step, setStep] = useState(1);
	const { userId, expire, secret } = searchParams;
	// console.log(searchParams);

	async function verifyByEmail() {
		try {
			if (isLoading) return;
			if (!userId || !secret) {
				throw new Error("Invalid entries");
			}
			setIsLoading(true);
			const response = await appwriteClient.verifyUserByEmail(
				userId,
				secret
			);
			if (!response) {
				throw new Error("Something went wrong");
			}
			setStep((prev) => prev + 1);
			setTimeout(() => redirect("/login"), 3000);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="w-full h-screen min-h-[800px]">
			<div className="text-center mt-10 border rounded-md max-w-sm p-5 mx-auto space-y-4">
				{step === 1 && (
					<>
						<MdOutlineEmail className="w-10 h-10 mx-auto" />
						<h2 className="font-bold">Verify your email address</h2>
						<button
							disabled={isLoading}
							onClick={verifyByEmail}
							className="btn btn-primary"
						>
							{isLoading ? (
								<span className="loading loading-dots"></span>
							) : (
								"Verify"
							)}
						</button>
					</>
				)}

				{step === 2 && (
					<>
						<MdOutlineMarkEmailRead className="w-10 h-10 mx-auto fill-success" />
						<h2 className="font-bold">Verified</h2>
						<p className="flex flex-col gap-4 items-center">
							<span>Close this tab or return</span>
							<Link
								href="/user"
								className="btn btn-primary"
							>
								Home
							</Link>
						</p>
					</>
				)}
			</div>
		</div>
	);
}

export default VerifyEmailAddressPage;

"use client";
import commaNumber from "comma-number";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { MdContentCopy } from "react-icons/md";
import QRCode from "react-qr-code";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiOutlineArrowLeft } from "react-icons/ai";
import ExchangeSuccessModal from "./modal";
import axios from "axios";
import { calculateReturns as calReturns } from "@/lib/utils";
import { appwriteClient } from "@/lib/client";

function ExchangeDisplay({ type, document }) {
	const [returns, setReturns] = useState(null);
	const [step, setStep] = useState(1);
	const [amt, setAmt] = useState();
	function calculateReturns() {
		let rate =
			type === "crypto"
				? document.rate
				: type === "account"
				? document.fee
				: 1;
		const returns = calReturns(type, amt, rate);

		setReturns(returns);
	}

	function nextStep() {
		setStep((prev) => prev + 1);
	}

	function prevStep() {
		setStep((prev) => prev - 1);
	}

	function showSuccessModal() {
		nextStep();
		// setTimeout(window.my_modal_5.showModal(), 2000);
	}
	return (
		<>
			{step === 1 && (
				<StepOne
					type={type}
					document={document}
					amt={amt}
					setAmt={setAmt}
					calculateReturns={calculateReturns}
					returns={returns}
					nextStep={nextStep}
				/>
			)}

			{step === 2 && (
				<StepTwo
					type={type}
					document={document}
					amt={amt}
					setAmt={setAmt}
					returns={returns}
					showSuccessModal={showSuccessModal}
					prevStep={prevStep}
				/>
			)}

			{step === 3 && <ExchangeSuccessModal />}
		</>
	);
}

function StepOne({
	type,
	document,
	calculateReturns,
	amt,
	setAmt,
	returns,
	nextStep,
}) {
	const [hasCalculated, setHasCalculated] = useState(false);
	function handleClick() {
		if (!amt) {
			toast.error("Enter amount");
		}
		calculateReturns();
		setHasCalculated(true);
	}

	useEffect(() => {
		setHasCalculated(false);
	}, [amt]);

	return (
		<>
			{/* step 1 */}
			<div className="space-y-10">
				<div>
					{type === "crypto" ? (
						<div className="flex justify-between gap-2">
							<span>Rate</span>
							<span className="font-bold">
								&#8358; {commaNumber(document.rate)}
							</span>
						</div>
					) : type === "account" ? (
						<div className="flex justify-between gap-2">
							<span>Charge</span>
							<span className="font-bold">
								&#8358; {commaNumber(document.fee)}
							</span>
						</div>
					) : (
						<div className="flex justify-between gap-2">
							<span>Fee</span>
							<span className="font-bold">&#8358; 200.00</span>
						</div>
					)}
				</div>
				<div>
					<div className="form-control mb-2">
						<label className="label">
							{type === "crypto"
								? `Quantity (${document.abbr})`
								: "Amount"}
						</label>
						<input
							type="number"
							className="input input-bordered"
							placeholder="0.001"
							inputMode="numeric"
							value={amt}
							onChange={(e) => setAmt(e.target.value)}
						/>
					</div>
					<div>
						<button
							disabled={!Number(amt)}
							className="btn btn-block btn-primary"
							onClick={handleClick}
						>
							Calculate
						</button>
					</div>
				</div>
				{!!amt && hasCalculated ? (
					<div className="text-center space-y-2">
						<p>Returns</p>
						<p className="text-2xl font-bold">
							&#8358; {commaNumber(Number(returns).toFixed(2))}
						</p>
						<div>
							<button
								onClick={nextStep}
								className="btn btn-primary"
							>
								Next
							</button>
						</div>
					</div>
				) : null}
			</div>
		</>
	);
}

function StepTwo({ type, document, returns, amt, prevStep, showSuccessModal }) {
	const [isLoading, setIsLoading] = useState(false);

	async function handleSubmit() {
		if (isLoading) return;
		setIsLoading(true);
		try {
			const token = await appwriteClient.getJWT();
			const response = await axios.post("/api/transactions/create", {
				type,
				doc_id: document.$id,
				amt,
				user_jwt: token.jwt,
			});
			// console.log(response);
			if (response.data.status) {
				showSuccessModal();
				toast.success("success");
			} else {
				throw new Error(response.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	}
	return (
		<div className="space-y-10">
			<div>
				<div className="flex justify-between gap-2">
					<span>Sending</span>

					<span className="uppercase">
						{type !== "crypto" ? <span>&#8358;</span> : null}
						{commaNumber(Number(amt).toFixed(2))}{" "}
						{type === "crypto" ? document.abbr : null}
					</span>
				</div>
				<div className="flex justify-between gap-2">
					<span>Returns</span>
					<span>
						&#8358; {commaNumber(Number(returns).toFixed(2))}
					</span>
				</div>
			</div>
			<div>
				{type === "crypto" ? (
					<>
						<div className="flex gap-2 justify-between flex-wrap items-center">
							<p className="text-sm">Address:</p>
							<p className="text-xs">{document.address}</p>
						</div>
						<div className="text-right">
							<CopyToClipboard
								text={document.address}
								onCopy={() => toast.success("copied")}
							>
								<button className="btn btn-sm btn-square">
									<MdContentCopy />
								</button>
							</CopyToClipboard>
						</div>
					</>
				) : type === "account" ? (
					<>
						{document?.tag && (
							<div className="flex gap-2 justify-between flex-wrap items-center">
								<p className="text-sm">Tag:</p>
								<p className="text-xs">{document.tag}</p>
							</div>
						)}
						{document?.email && !!document.email && (
							<div className="flex gap-2 justify-between flex-wrap items-center">
								<p className="text-sm">E-mail:</p>
								<p className="text-xs">{document.email}</p>
							</div>
						)}
						{document?.phone && !!document.phone && (
							<div className="flex gap-2 justify-between flex-wrap items-center">
								<p className="text-sm">Phonenumber:</p>
								<p className="text-xs">{document.phone}</p>
							</div>
						)}
					</>
				) : null}
			</div>
			<div>
				<div className="max-w-[200px] mx-auto">
					<QRCode
						style={{
							height: "auto",
							maxWidth: "100%",
							width: "100%",
						}}
						size={256}
						value={
							type === "crypto" ? document.address : document.tag
						}
					/>
				</div>
			</div>
			<div>
				<div className="text-center">
					<button
						disabled={isLoading}
						className="btn btn-primary"
						onClick={handleSubmit}
					>
						{isLoading ? (
							<>
								<span className="loading loading-dots"></span>
							</>
						) : (
							"Done"
						)}
					</button>
				</div>
			</div>
			<div>
				<p className="text-xs">
					* only click done after make transaction to avoid delay
				</p>
				<div className=" mt-2">
					<button
						className=" flex gap-2 items-center"
						onClick={prevStep}
					>
						<AiOutlineArrowLeft />
						back
					</button>
				</div>
			</div>
		</div>
	);
}

export default ExchangeDisplay;

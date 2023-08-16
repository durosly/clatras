"use client";

import commaNumber from "comma-number";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import ExchangeSuccessModal from "../../exchange/[type]/modal";
import { toast } from "react-hot-toast";
import axios from "axios";
import { appwriteClient } from "@/lib/client";

function PurchaseDisplay({ doc }) {
	const [step, setStep] = useState(1);
	const [amt, setAmt] = useState();
	const [cost, setCost] = useState(null);
	function calculateCost() {
		let costPrice = amt * parseFloat(`${doc?.cost}`);
		setCost(costPrice);
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
		<div>
			{step === 1 && (
				<StepOne
					amt={amt}
					setAmt={setAmt}
					cost={cost}
					calculateCost={calculateCost}
					nextStep={nextStep}
					document={doc}
				/>
			)}
			{step === 2 && (
				<StepTwo
					cost={cost}
					amt={amt}
					prevStep={prevStep}
					showSuccessModal={showSuccessModal}
					document={doc}
				/>
			)}
			{step === 3 && <ExchangeSuccessModal />}
		</div>
	);
}

function StepOne({ calculateCost, amt, setAmt, cost, nextStep, document }) {
	const [hasCalculated, setHasCalculated] = useState(false);
	function handleClick() {
		if (!amt) {
			toast.error("Enter amount");
		}
		calculateCost();
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
					<div className="flex justify-between gap-2">
						<span>Cost</span>
						<span className="font-bold">
							&#8358; {commaNumber(document.cost)}
						</span>
					</div>
				</div>
				<div>
					<div className="form-control mb-2">
						<label className="label">Quantity</label>
						<input
							type="number"
							className="input input-bordered"
							placeholder="Number of google voice account"
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
						<p>Charge</p>
						<p className="text-2xl font-bold">
							&#8358; {commaNumber(Number(cost).toFixed(2))}
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

function StepTwo({ document, cost, amt, prevStep, showSuccessModal }) {
	const [isLoading, setIsLoading] = useState(false);

	async function handleSubmit() {
		if (isLoading) return;
		setIsLoading(true);

		try {
			const token = await appwriteClient.getJWT();
			const response = await axios.post("/api/transactions/create", {
				type: "g-voice",
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
						<span>&#8358;</span>
						{commaNumber(Number(cost).toFixed(2))}
					</span>
				</div>
				<div className="flex justify-between gap-2">
					<span>Returns</span>
					<span>
						{amt} Account{amt > 1 && "s"}
					</span>
				</div>
			</div>
			<div>
				<div className="flex gap-2 justify-between flex-wrap items-center">
					<p className="text-sm">Bank Name:</p>
					<p className="text-xs">Access</p>
				</div>

				<div className="flex gap-2 justify-between flex-wrap items-center">
					<p className="text-sm">Account Number:</p>
					<p className="text-xs">1234567890</p>
				</div>

				<div className="flex gap-2 justify-between flex-wrap items-center">
					<p className="text-sm">Account Name:</p>
					<p className="text-xs">Nicely Done</p>
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
				<p className="text-xs font-bold">
					* only click done after making transfer to avoid delay
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

export default PurchaseDisplay;

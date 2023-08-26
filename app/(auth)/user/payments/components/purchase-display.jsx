"use client";

import commaNumber from "comma-number";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import ExchangeSuccessModal from "../../exchange/[type]/modal";
import { toast } from "react-hot-toast";
import axios from "axios";
import { appwriteClient } from "@/lib/client";

function PurchaseDisplay({ docs, details }) {
	const [step, setStep] = useState(1);
	const [amt, setAmt] = useState();
	const [cost, setCost] = useState(null);
	const [card, setCard] = useState("");
	const [item, setItem] = useState({});
	function calculateCost(fee) {
		let costPrice = amt * parseFloat(fee);
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
					documents={docs}
					card={card}
					setCard={setCard}
					item={item}
					setItem={setItem}
				/>
			)}
			{step === 2 && (
				<StepTwo
					cost={cost}
					amt={amt}
					prevStep={prevStep}
					showSuccessModal={showSuccessModal}
					document={item}
					details={details}
				/>
			)}
			{step === 3 && <ExchangeSuccessModal />}
		</div>
	);
}

function StepOne({
	calculateCost,
	amt,
	setAmt,
	cost,
	nextStep,
	documents,
	card,
	setCard,
	item,
	setItem,
}) {
	const [hasCalculated, setHasCalculated] = useState(false);

	function handleClick() {
		if (!amt) {
			toast.error("Enter amount");
		}
		calculateCost(item.fee);
		setHasCalculated(true);
	}

	function handleSelect(id) {
		if (!id) return;
		let selectedItem =
			documents?.find((document) => document.$id === id) || {};
		setItem(selectedItem);
		setCard(id);
	}

	useEffect(() => {
		setHasCalculated(false);
	}, [amt]);

	return (
		<>
			{/* step 1 */}
			<div className="space-y-5">
				{item?.fee && (
					<div>
						<div className="flex justify-between gap-2">
							<span>Rate</span>
							<span className="font-bold">
								&#8358; {commaNumber(item?.fee)}/$
							</span>
						</div>
					</div>
				)}
				<div>
					<div className="form-control mb-2">
						<label className="label">Card</label>
						<select
							value={card}
							onChange={(e) => handleSelect(e.target.value)}
							className="select select-bordered"
						>
							<option
								value=""
								disabled
							>
								-- select card--
							</option>
							{documents.map((d) => (
								<option
									key={d.$id}
									value={d.$id}
								>
									{d.name}
								</option>
							))}
						</select>
					</div>
					<div className="form-control mb-2">
						<label className="label">Amount($)</label>
						<input
							type="number"
							className="input input-bordered"
							placeholder="200"
							inputMode="numeric"
							value={amt}
							onChange={(e) => setAmt(e.target.value)}
						/>
					</div>
					<div>
						<button
							disabled={!Number(amt)}
							className="btn btn-block btn-primary mt-4"
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

function StepTwo({ document, cost, amt, prevStep, showSuccessModal, details }) {
	const [isLoading, setIsLoading] = useState(false);
	async function handleSubmit() {
		if (isLoading) return;
		setIsLoading(true);

		try {
			const token = await appwriteClient.getJWT();
			const response = await axios.post("/api/transactions/create", {
				type: "payment",
				doc_id: document.$id,
				amt,
				user_jwt: token.jwt,
				bankId: details.$id,
			});

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
				<div className="flex justify-between text-sm gap-2">
					<span>Payment Account</span>

					<span className="uppercase">{document.name}</span>
				</div>
				<div className="flex justify-between text-sm gap-2">
					<span>Sending</span>

					<span className="uppercase">
						<span>$</span>
						{commaNumber(Number(amt).toFixed(2))}
					</span>
				</div>
				<div className="flex justify-between text-sm gap-2">
					<span>Returns</span>
					<span>
						<span>&#8358;</span>
						{commaNumber(Number(cost).toFixed(2))}
					</span>
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
							"Confirm"
						)}
					</button>
				</div>
			</div>
			<div>
				<p className="text-xs font-bold">* Click Confirm to proceed</p>
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

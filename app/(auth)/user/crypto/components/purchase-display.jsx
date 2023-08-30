"use client";

import commaNumber from "comma-number";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import ExchangeSuccessModal from "../../exchange/[type]/modal";
import { toast } from "react-hot-toast";
import axios from "axios";
import { appwriteClient } from "@/lib/client";

function PurchaseDisplay({ docs, details, d_rate }) {
	const [step, setStep] = useState(1);
	const [amt, setAmt] = useState("");
	const [qty, setQty] = useState("");
	const [cost, setCost] = useState(null);
	const [rate, setRate] = useState(null);
	const [card, setCard] = useState("");
	const [item, setItem] = useState({});

	function calculateCost(fee) {
		// console.log(amt, fee, d_rate);
		let costPrice = qty * parseFloat(fee) * d_rate;
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
					qty={qty}
					setQty={setQty}
					d_rate={d_rate}
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
					qty={qty}
					setQty={setQty}
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
	qty,
	setQty,
	d_rate,
}) {
	const [hasCalculated, setHasCalculated] = useState(false);

	function handleClick() {
		if (!amt) {
			toast.error("Enter amount");
		}
		calculateCost(item.rate);
		setHasCalculated(true);
	}

	function handleAmountChange(a) {
		if (Number(a) && item.rate) {
			setAmt(Number(a));
			const newQty = a / item.rate;
			setQty(newQty);
		} else {
			setAmt("");
			setQty("");
		}
	}
	function handleQuantityChange(a) {
		setQty(a);
		if (Number(a) && item.rate) {
			const newAmt = a * item.rate;
			setAmt(newAmt);
		} else {
			setAmt("");
		}
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
				{item?.rate && (
					<div>
						<div className="flex justify-between gap-2">
							<span>Rate</span>
							<div className="flex flex-col">
								<span className="font-bold">
									&#8358; {commaNumber(item?.rate * d_rate)}
								</span>
								<span className="font-bold text-xs">
									$ {commaNumber(item?.rate)}
								</span>
							</div>
						</div>
					</div>
				)}
				<div>
					<div className="form-control mb-2">
						<label className="label">Coin</label>
						<select
							value={card}
							onChange={(e) => handleSelect(e.target.value)}
							className="select select-bordered"
						>
							<option
								value=""
								disabled
							>
								-- select coin--
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
							placeholder="100..."
							value={amt}
							onChange={(e) => handleAmountChange(e.target.value)}
						/>
					</div>
					<div className="form-control mb-2">
						<label className="label">Quantity</label>
						<input
							type="number"
							className="input input-bordered"
							placeholder="0.01..."
							value={qty}
							onChange={(e) =>
								handleQuantityChange(e.target.value)
							}
						/>
					</div>
					<div>
						<button
							disabled={!Number(amt)}
							className="btn btn-block btn-primary mt-4"
							onClick={handleClick}
						>
							Proceed
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

function StepTwo({
	document,
	cost,
	amt,
	prevStep,
	showSuccessModal,
	details,
	qty,
}) {
	const [isLoading, setIsLoading] = useState(false);

	async function handleSubmit() {
		if (isLoading) return;
		setIsLoading(true);

		try {
			const token = await appwriteClient.getJWT();
			const response = await axios.post("/api/transactions/create", {
				type: "crypto",
				doc_id: document.$id,
				amt,
				user_jwt: token.jwt,
				bankId: details.$id,
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
				<div className="flex justify-between text-sm gap-2">
					<span>Sending</span>

					<span className="uppercase">
						<span>{commaNumber(Number(qty).toFixed(6))}</span>
						{document?.abbr}
					</span>
				</div>
				<div className="flex justify-between text-sm gap-2">
					<span>Returns</span>
					<span className="uppercase">
						<span>&#8358;</span>
						{commaNumber(Number(cost).toFixed(2))}
					</span>
				</div>
			</div>

			<div>
				<div className="flex gap-2 justify-between flex-wrap items-center">
					<p className="text-sm">Coin:</p>
					<p className="text-xs">{document.name}</p>
				</div>
				<div className="flex gap-2 justify-between flex-wrap items-center">
					<p className="text-sm">Address:</p>
					<p className="text-xs">{document.address}</p>
				</div>

				<div className="flex gap-2 justify-between flex-wrap items-center">
					<p className="text-sm">Network:</p>
					<p className="text-xs">{document.network}</p>
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

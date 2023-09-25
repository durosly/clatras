"use client";

import commaNumber from "comma-number";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import ExchangeSuccessModal from "../../exchange/[type]/modal";
import { toast } from "react-hot-toast";
import axios from "axios";
import { appwriteClient } from "@/lib/client";
import QRCode from "react-qr-code";
import CopyToClipboard from "react-copy-to-clipboard";
import { IoCopyOutline } from "react-icons/io5";

function PurchaseDisplay({ docs, details, d_rate, adminDetails }) {
	const [step, setStep] = useState(1);
	const [amt, setAmt] = useState("");
	const [qty, setQty] = useState("");
	const [cost, setCost] = useState(null);
	const [rate, setRate] = useState(null);
	const [card, setCard] = useState("");
	const [item, setItem] = useState({});
	const [market, setMarket] = useState("sell");

	function calculateCost(fee) {
		// console.log(amt, fee, d_rate);
		let costPrice = qty * parseFloat(fee) * d_rate[market];
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
					market={market}
					setMarket={setMarket}
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
					market={market}
					adminDetails={adminDetails}
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
	market,
	setMarket,
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
	}, [amt, market, item]);

	return (
		<>
			{/* step 1 */}
			<div className="space-y-5">
				<div>
					<div className="flex justify-between gap-2">
						<span>Rate</span>
						<div className="flex flex-col">
							<span className="font-bold">
								&#8358; {commaNumber(d_rate[market])}/$
							</span>
						</div>
					</div>
					{/* {item?.rate && (
						<div className="flex justify-between gap-2">
							<span>Price</span>
							<div className="flex flex-col">
								
								<span className="font-bold text-xs">
									$ {commaNumber(item?.rate)}
								</span>
							</div>
						</div>
					)} */}
				</div>
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
						<label className="label">Market</label>
						<select
							value={market}
							onChange={(e) => setMarket(e.target.value)}
							className="select select-bordered"
						>
							<option
								value=""
								disabled
							>
								-- select market--
							</option>

							<option value="sell">Sell</option>
							<option value="buy">Buy</option>
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
						<p>{market === "sell" ? "Returns" : "Sending"}</p>
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
	market,
	adminDetails,
}) {
	const [isLoading, setIsLoading] = useState(false);
	const [bankDetails, setBankDetails] = useState({});
	const [bankId, setBankId] = useState("");
	const [wallet, setWallet] = useState("");
	const [network, setNetwork] = useState("");

	function handleSelect(id) {
		if (!id) return;
		let selectedItem =
			adminDetails?.find((document) => document.$id === id) || {};

		setBankDetails(selectedItem);
		setBankId(id);
	}

	async function handleSubmit() {
		if (isLoading) return;
		setIsLoading(true);

		try {
			const token = await appwriteClient.getJWT();
			const response = await axios.post(
				"/api/transactions/create/crypto",
				{
					doc_id: document.$id,
					amt,
					user_jwt: token.jwt,
					bankId: market === "sell" ? details.$id : bankId,
					market,
					wallet,
					network,
				}
			);
			// console.log(response);
			if (response.data.status) {
				showSuccessModal();
				toast.success("success");
			} else {
				throw new Error(response.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.message || error.message);
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
						{market === "sell" ? (
							<>
								<span>
									{commaNumber(Number(qty).toFixed(6))}
								</span>
								{document?.abbr}
							</>
						) : (
							<>
								<span>&#8358;</span>
								{commaNumber(Number(cost).toFixed(2))}
							</>
						)}
					</span>
				</div>
				<div className="flex justify-between text-sm gap-2">
					<span>Returns</span>
					<span className="uppercase">
						{market === "sell" ? (
							<>
								<span>&#8358;</span>
								{commaNumber(Number(cost).toFixed(2))}
							</>
						) : (
							<>
								<span>
									{commaNumber(Number(qty).toFixed(6))}
								</span>
								{document?.abbr}
							</>
						)}
					</span>
				</div>
			</div>

			{market === "sell" ? (
				<>
					<div>
						<div className="flex gap-2 justify-between flex-wrap items-center">
							<p className="text-sm">Coin:</p>
							<p className="text-xs">{document.name}</p>
						</div>
						<div className="flex gap-2 justify-between flex-wrap items-center">
							<p className="text-sm">Address:</p>
							<p className="text-xs">
								<span className="break-words break-all">
									{document.address}
								</span>
								<CopyToClipboard
									text={document.address}
									onCopy={() => toast("copied")}
								>
									<button className="btn btn-xs btn-ghost btn-square">
										<IoCopyOutline />
									</button>
								</CopyToClipboard>
							</p>
						</div>

						<div className="flex gap-2 justify-between flex-wrap items-center">
							<p className="text-sm">Network:</p>
							<p className="text-xs">{document.network}</p>
						</div>
					</div>
					<div className="mx-auto w-full max-w-[200px]">
						<QRCode
							size={256}
							style={{
								height: "auto",
								maxWidth: "100%",
								width: "100%",
							}}
							value={document.address}
							viewBox={`0 0 256 256`}
						/>
					</div>
				</>
			) : (
				<>
					<div>
						<div className="flex gap-2 justify-between flex-wrap items-center">
							<p className="text-sm">Coin:</p>
							<p className="text-xs">{document.name}</p>
						</div>
						<div className="flex gap-2 justify-between flex-wrap items-center">
							<p className="text-sm">Market:</p>
							<p className="text-xs">{market}</p>
						</div>
					</div>
					<div>
						<div className="form-control mb-2">
							<select
								value={bankId}
								onChange={(e) => handleSelect(e.target.value)}
								className="select select-bordered"
							>
								<option
									value=""
									disabled
								>
									-- select bank --
								</option>
								{adminDetails.map((d) => (
									<option
										key={d.$id}
										value={d.$id}
									>
										{d.bank_name}
									</option>
								))}
							</select>
						</div>

						{Object.keys(bankDetails).length > 0 && (
							<div>
								<div className="flex gap-2 justify-between flex-wrap items-center">
									<p className="text-sm">Bank Name:</p>
									<p className="text-xs">
										{bankDetails.bank_name}
									</p>
								</div>
								<div className="flex gap-2 justify-between flex-wrap items-center">
									<p className="text-sm">Account Number:</p>
									<p className="text-xs">
										{bankDetails.account_number}
									</p>
								</div>

								<div className="flex gap-2 justify-between flex-wrap items-center">
									<p className="text-sm">Account Name:</p>
									<p className="text-xs">
										{bankDetails.account_name}
									</p>
								</div>
							</div>
						)}
					</div>
					<div>
						<p className="text-xs">
							Enter recieving wallet address
						</p>
						<div className="form-control">
							<label
								htmlFor="wallet"
								className="label justify-start"
							>
								Wallet<span className="text-error">*</span>
							</label>
							<input
								type="text"
								className="input input-bordered"
								id="wallet"
								name="wallet"
								value={wallet}
								onChange={(e) => setWallet(e.target.value)}
							/>
						</div>
						<div className="form-control">
							<label
								htmlFor="network"
								className="label"
							>
								Network
							</label>
							<input
								type="text"
								className="input input-bordered"
								id="network"
								name="network"
								value={network}
								onChange={(e) => setNetwork(e.target.value)}
							/>
						</div>
					</div>
				</>
			)}
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

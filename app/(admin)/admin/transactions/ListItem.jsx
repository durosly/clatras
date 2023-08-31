import axios from "axios";
import commaNumber from "comma-number";
import { useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-hot-toast";
import { AiFillEye } from "react-icons/ai";
import { BsCheck2 } from "react-icons/bs";
import { LiaTimesSolid } from "react-icons/lia";

function ListItem({ doc, count, update }) {
	const [showDetails, setShowDetails] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	let type = "badge-warning";
	if (doc.status === "declined") {
		type = "badge-error";
	} else if (doc.status === "success") {
		type = "badge-success";
	}

	async function updateState(status) {
		if (isLoading) return;
		const toastId = toast.loading("Updating");
		setIsLoading(true);
		try {
			const response = await axios.post("/api/admin/transactions", {
				status,
				id: doc.$id,
			});
			if (response.data.status) {
				toast.success("Success", { id: toastId });
				doc.status = status;
				update(doc);
				setShowDetails(false);
			} else {
				throw new Error(response.data.message);
			}
		} catch (error) {
			toast.error(error.message, { id: toastId });
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<>
			<tr>
				<th>{count}</th>
				<td className="whitespace-nowrap">{doc.description}</td>
				<td className="space-x-2">
					{doc.type === "crypto" ? (
						<>
							<span className="mr-1">{doc.sending}</span>
							<span>{doc.item_name}</span>
						</>
					) : doc.type === "gift-card" ? (
						<>
							<span>${doc.amount}</span>
							<span>{doc.item_name}</span>
						</>
					) : doc.type === "verification" ? (
						<>
							<span>{doc.amount}</span>
							<span>{doc.item_name}</span>
						</>
					) : doc.type === "payment" ? (
						<>
							<span>${commaNumber(doc.amount)}</span>
						</>
					) : null}
				</td>
				<td className="flex items-center gap-2">
					<span className={`capitalize badge p-3 text-xs ${type}`}>
						{doc.status}
					</span>
					<button onClick={() => setShowDetails(true)}>
						<AiFillEye />
					</button>
				</td>
				<td className="whitespace-nowrap">
					{new Intl.DateTimeFormat("en-GB", {
						dateStyle: "full",
						timeStyle: "long",
						hour12: true,
					}).format(new Date(doc.$createdAt))}
				</td>
			</tr>
			{showDetails &&
				createPortal(
					<dialog className="modal modal-open modal-middle backdrop-blur-sm">
						<div className="modal-box space-y-5">
							<button
								onClick={() => setShowDetails(false)}
								className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
							>
								<LiaTimesSolid />
							</button>
							<div className="">
								<h3 className="font-bold text-lg">
									{doc.description}
								</h3>
								<span
									className={`capitalize badge p-3 text-xs ${type}`}
								>
									{doc.status}
								</span>
								{doc.status === "pending" && (
									<div className="mt-2 space-x-2">
										<button
											onClick={() =>
												updateState("success")
											}
											disabled={isLoading}
											className="btn btn-primary btn-outline btn-sm btn-square"
										>
											<BsCheck2 />
										</button>
										<button
											onClick={() =>
												updateState("declined")
											}
											disabled={isLoading}
											className="btn btn-error btn-outline btn-sm btn-square"
										>
											<LiaTimesSolid />
										</button>
									</div>
								)}
								<ul className="list-disc list-inside my-5">
									<li className="flex gap-2 justify-between border-b py-3 last:border-b-0">
										<span>Type</span>
										<span>{doc.type}</span>
									</li>
									<li className="flex gap-2 justify-between border-b py-3 last:border-b-0">
										<span>Item</span>
										<span>{doc.item_name}</span>
									</li>
									<li className="flex flex-wrap gap-2 justify-between border-b py-3 last:border-b-0">
										<span>Amount</span>
										<span>
											{doc.type === "crypto" ? (
												<>
													<span className="mr-1">
														{doc.sending}
													</span>
													<span>{doc.item_name}</span>
												</>
											) : doc.type === "gift-card" ? (
												<>
													<span>${doc.amount}</span>
													<span>{doc.item_name}</span>
												</>
											) : doc.type === "verification" ? (
												<>
													<span className="mr-1">
														{doc.amount}
													</span>
													<span>{doc.item_name}</span>
												</>
											) : doc.type === "payment" ? (
												<>
													<span className="">
														${doc.amount}
													</span>
												</>
											) : null}
										</span>
									</li>
									<li className="flex flex-wrap gap-2 justify-between border-b py-3 last:border-b-0">
										<span>Rate</span>
										<span>
											{(doc.type === "crypto" ||
												doc.type === "verification" ||
												doc.type === "payment") && (
												<span>$</span>
											)}
											{commaNumber(doc.rate)}

											{doc.type === "gift-card" && (
												<span>/$</span>
											)}
										</span>
									</li>
									{doc.type === "verification" && (
										<li className="flex flex-wrap gap-2 justify-between">
											<span>Sending</span>
											<span>
												&#8358;{" "}
												{commaNumber(doc.sending)}
											</span>
										</li>
									)}
									<li className="flex flex-wrap gap-2 justify-between border-b py-3 last:border-b-0">
										<span>Returns</span>
										{doc.type === "verification" ? (
											<span>
												{commaNumber(doc.amount)}{" "}
												Account{doc.amount > 1 && "s"}
											</span>
										) : doc.type === "gift-card" ? (
											<>
												<span className="">
													${doc.amount}{" "}
													{doc.item_name}
												</span>
											</>
										) : (
											<span>
												<span>&#8358;</span>
												{commaNumber(doc.returns)}
											</span>
										)}
									</li>
								</ul>
								<div className="divider">Payment details</div>
								<ul className="">
									{doc.type === "crypto" && (
										<li className="flex flex-wrap gap-2 justify-between">
											<span>Address</span>
											<span>{doc.address}</span>
										</li>
									)}
									{doc.type === "payment" && (
										<>
											{doc?.tag &&
												doc.tag &&
												doc.tag !== "nil" && (
													<li className="flex flex-wrap gap-2 justify-between">
														<span>Tag</span>
														<span>{doc.tag}</span>
													</li>
												)}
											{doc?.phone &&
												doc.phone &&
												doc.phone !== "nil" && (
													<li className="flex flex-wrap gap-2 justify-between">
														<span>Phone</span>
														<span>{doc.phone}</span>
													</li>
												)}
											{doc?.email &&
												doc.email &&
												doc.email !== "nil" && (
													<li className="flex flex-wrap gap-2 justify-between">
														<span>Email</span>
														<span>{doc.email}</span>
													</li>
												)}
										</>
									)}
									{(doc.type === "gift-card" ||
										doc.type === "verification") && (
										<>
											{doc?.account_bank && (
												<li className="flex flex-wrap gap-2 justify-between">
													<span>Bank name</span>
													<span>
														{doc.account_bank}
													</span>
												</li>
											)}
											{doc?.account_number && (
												<li className="flex flex-wrap gap-2 justify-between">
													<span>Account Number</span>
													<span>
														{doc.account_number}
													</span>
												</li>
											)}
											{doc?.account_name && (
												<li className="flex flex-wrap gap-2 justify-between">
													<span>Account Name</span>
													<span>
														{doc.account_name}
													</span>
												</li>
											)}
										</>
									)}
								</ul>
								<div className="divider">Customer details</div>
								<ul className="">
									{(doc.type === "crypto" ||
										doc.type === "payment") && (
										<>
											{doc?.user?.account?.bank_name && (
												<li className="flex flex-wrap gap-2 justify-between">
													<span>Bank name</span>
													<span>
														{
															doc.user.account
																.bank_name
														}
													</span>
												</li>
											)}
											{doc?.user?.account
												?.account_number && (
												<li className="flex flex-wrap gap-2 justify-between">
													<span>Account Number</span>
													<span>
														{
															doc.user.account
																.account_number
														}
													</span>
												</li>
											)}
											{doc?.user?.account
												?.account_name && (
												<li className="flex flex-wrap gap-2 justify-between">
													<span>Account Name</span>
													<span>
														{
															doc.user.account
																.account_name
														}
													</span>
												</li>
											)}
										</>
									)}

									{(doc.type === "gift-card" ||
										doc.type === "verification" ||
										doc.type === "payment") && (
										<>
											{doc?.user?.name && (
												<li className="flex flex-wrap gap-2 justify-between">
													<span>Name</span>
													<span>{doc.user.name}</span>
												</li>
											)}
											{doc?.user?.email && (
												<li className="flex flex-wrap gap-2 justify-between">
													<span>Email address</span>
													<span>
														{doc.user.email}
													</span>
												</li>
											)}
										</>
									)}
								</ul>
							</div>

							<div className="mt-12 sm:hidden"></div>
						</div>
					</dialog>,
					document.getElementById("modal-container")
				)}
		</>
	);
}

export default ListItem;

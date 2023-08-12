"use client";

import commaNumber from "comma-number";
import { useState } from "react";
import { createPortal } from "react-dom";
import { AiFillEye } from "react-icons/ai";
import { LiaTimesSolid } from "react-icons/lia";

function ListItem({ doc, count }) {
	const [showDetails, setShowDetails] = useState(false);
	let type = "badge-warning";
	if (doc.status === "declined") {
		type = "badge-error";
	} else if (doc.status === "success") {
		type = "badge-success";
	}
	return (
		<>
			<tr>
				<th>{count}</th>
				<td className="whitespace-nowrap">{doc.description}</td>
				<td className="space-x-2">
					{doc.type === "account" && <span>&#8358;</span>}
					<span>{commaNumber(doc.amount)}</span>
					{doc.type === "crypto" && <span>{doc.item_name}</span>}
					{doc.type === "g-voice" && <span>{doc.item_name}</span>}
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
											{doc.type === "account" && (
												<span>&#8358;</span>
											)}
											{commaNumber(doc.amount)}
										</span>
									</li>
									<li className="flex flex-wrap gap-2 justify-between border-b py-3 last:border-b-0">
										<span>Rate</span>
										<span>
											{doc.type === "crypto" && (
												<span>&#8358;</span>
											)}
											{commaNumber(doc.rate)}
											{doc.type === "account" && (
												<span>%</span>
											)}
										</span>
									</li>
									<li className="flex flex-wrap gap-2 justify-between border-b py-3 last:border-b-0">
										<span>Returns</span>
										{doc.type === "g-voice" ? (
											<span>
												{commaNumber(doc.amount)}{" "}
												Account{doc.amount > 1 && "s"}
											</span>
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
									{doc.type === "account" && (
										<>
											{doc?.tag && (
												<li className="flex flex-wrap gap-2 justify-between">
													<span>Tag</span>
													<span>{doc.tag}</span>
												</li>
											)}
										</>
									)}
									{doc.type === "g-voice" && (
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

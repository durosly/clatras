"use client";

import axios from "axios";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { toast } from "react-hot-toast";
import { CheckIcon } from "@radix-ui/react-icons";
import { BsChevronExpand } from "react-icons/bs";

const initialState = {
	name: "",
	network: "",
	address: "",
	rate: "",
	abbr: "",
};

function CreateCryptoForm({ c_list }) {
	const [listType, setListType] = useState("predefined");
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState(initialState);

	async function createNewToken(e) {
		e.preventDefault();
		if (isLoading) return;
		setIsLoading(true);
		const toastId = toast.loading("creating...");
		try {
			const response = await axios.post("/api/admin/crypto", {
				...data,
				type: listType,
			});

			toast.success("Done", { id: toastId });
			setData({ ...initialState });
		} catch (error) {
			console.log(error);
			toast.error(
				error?.response?.data?.message || "Something went wrong",
				{ id: toastId }
			);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<form onSubmit={createNewToken}>
			<div className="form-control flex-row flex-wrap gap-4">
				<label className="label justify-start gap-2 cursor-pointer">
					<span className="label-text">Custom</span>
					<input
						type="radio"
						name="radio-10"
						className="radio"
						checked={listType === "custom"}
						onChange={() => setListType("custom")}
					/>
				</label>
				<label className="label justify-start gap-2 cursor-pointer">
					<span className="label-text">Predefined</span>
					<input
						type="radio"
						name="radio-10"
						className="radio"
						checked={listType === "predefined"}
						onChange={() => setListType("predefined")}
					/>
				</label>
			</div>

			{listType === "custom" && (
				<>
					<div className="form-control">
						<label className="label">Name</label>
						<input
							type="text"
							className="input input-bordered"
							name="name"
							value={data.name}
							onChange={(e) =>
								setData({
									...data,
									[e.target.name]: e.target.value,
								})
							}
						/>
					</div>
					<div className="form-control">
						<label className="label">Abbreviation</label>
						<input
							type="text"
							className="input input-bordered"
							name="abbr"
							value={data.abbr}
							onChange={(e) =>
								setData({
									...data,
									[e.target.name]: e.target.value,
								})
							}
						/>
					</div>
				</>
			)}
			{listType === "predefined" && (
				<>
					<div className="form-control">
						<div className="w-full">
							<Listbox
								value={data}
								onChange={setData}
							>
								<div className="relative mt-1">
									<Listbox.Button className="relative w-full cursor-default border rounded-lg bg-white py-3 pl-3 pr-10 text-left sm:text-sm">
										<span className="block truncate">
											{data?.name || "-- select coin--"}
										</span>
										<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
											<BsChevronExpand
												className="h-5 w-5 text-gray-400"
												aria-hidden="true"
											/>
										</span>
									</Listbox.Button>
									<Transition
										as={Fragment}
										leave="transition ease-in duration-100"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
											{c_list.map((item, personIdx) => (
												<Listbox.Option
													key={personIdx}
													className={({ active }) =>
														`relative cursor-default select-none py-2 pl-10 pr-4 ${
															active
																? "bg-primary/10"
																: "text-gray-900"
														}`
													}
													value={{
														...item,
														name: item.name,
														abbr: item.symbol,
														rate: 1,
													}}
												>
													{({ selected }) => (
														<>
															<span
																className={`block truncate ${
																	selected
																		? "font-medium"
																		: "font-normal"
																}`}
															>
																{item.name} (
																{item.symbol})
															</span>
															{selected ? (
																<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
																	<CheckIcon
																		className="h-5 w-5"
																		aria-hidden="true"
																	/>
																</span>
															) : null}
														</>
													)}
												</Listbox.Option>
											))}
										</Listbox.Options>
									</Transition>
								</div>
							</Listbox>
						</div>
					</div>
				</>
			)}
			<div className="form-control">
				<label className="label">Network (can be empty)</label>
				<input
					type="text"
					className="input input-bordered"
					name="network"
					value={data.network}
					onChange={(e) =>
						setData({ ...data, [e.target.name]: e.target.value })
					}
				/>
			</div>
			<div className="form-control">
				<label className="label">Address</label>
				<input
					type="text"
					className="input input-bordered"
					name="address"
					value={data.address}
					onChange={(e) =>
						setData({ ...data, [e.target.name]: e.target.value })
					}
				/>
			</div>

			<div className="form-control">
				<label className="label">Price($)</label>
				<input
					type="text"
					className="input input-bordered"
					name="rate"
					readOnly={listType === "predefined"}
					value={data.rate}
					onChange={(e) =>
						setData({ ...data, [e.target.name]: e.target.value })
					}
				/>
			</div>
			{listType === "predefined" && (
				<p className="text-xs">
					** Price would update automatically after submission**
				</p>
			)}
			<button
				disabled={isLoading}
				className="btn btn-primary mt-4"
			>
				Add
			</button>
		</form>
	);
}

export default CreateCryptoForm;

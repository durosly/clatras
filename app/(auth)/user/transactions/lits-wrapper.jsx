"use client";

import { useState } from "react";
import ListItem from "../components/list-item";
import { toast } from "react-hot-toast";
import axios from "axios";
import { appwriteClient } from "@/lib/client";

function ListWrapper({ documents }) {
	const [list, setList] = useState(documents);
	const [isLoading, setIsLoading] = useState(false);

	async function loadMore() {
		if (isLoading) return;
		try {
			setIsLoading(true);
			const token = await appwriteClient.getJWT();
			const response = await axios(
				`/api/transactions/user/get-more?lastId=${
					list[list.length - 1].$id
				}&token=${token.jwt}`
			);

			if (response.data.status) {
				setList([...list, ...response.data.doc.documents]);
			} else {
				throw new Error(response.data.message);
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<>
			<div className="mt-4 overflow-x-auto">
				<table className="table table-sm sm:table-md table-zebra min-w-[500px]">
					{/* head */}
					<thead>
						<tr>
							<th></th>
							<th>Summary</th>
							<th>Amount</th>
							<th>Status</th>
							<th>Date/Time</th>
						</tr>
					</thead>
					<tbody>
						{list.map((doc, i) => (
							<ListItem
								key={doc.$id}
								doc={doc}
								count={i + 1}
							/>
						))}
					</tbody>
				</table>
			</div>
			<div className="text-center mt-5">
				<button
					disabled={isLoading}
					className="btn btn-sm btn-primary"
					onClick={loadMore}
				>
					{isLoading ? (
						<span className="loading loading-dots"></span>
					) : (
						"Load More"
					)}
				</button>
			</div>
		</>
	);
}

export default ListWrapper;

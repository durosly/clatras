/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import StatusDropdown from "./StatusDropdown";
import DateInput from "./DateInput";
import ListItem from "./ListItem";

function ListWrapper() {
	const [list, setList] = useState([]);
	const [query, setQuery] = useState({ status: "", date: "" });
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [lastId, setLastId] = useState(null);

	const loadTransactions = useCallback(
		async (loadMore) => {
			if (isLoading) return;

			setIsLoading(true);
			try {
				const response = await axios.get(`/api/admin/transactions`, {
					params: {
						status: query.status,
						date: query.date,
						lastId,
					},
				});

				if (response.data.status) {
					if (loadMore) {
						handleMoreList(response.data.doc);
					} else {
						handleNewList(response.data.doc);
					}
				} else {
					throw new Error(response.data.message);
				}
			} catch (error) {
				toast.error(error.message);
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		},
		[query.date, query.status, list, isLoadingMore]
	);

	useEffect(() => {
		if (query.date !== "" || query.status !== "") {
			setLastId(null);
		}
	}, [query.date, query.status]);

	const handleNewList = (entryList) => {
		setList(entryList);
		setLastId(!entryList[0]?.$id ? null : entryList?.slice(-1)[0].$id); // if there is
	};

	const handleMoreList = (entryList) => {
		setList((prevList) => [...prevList, ...entryList]);
		setIsLoadingMore(false);
		setLastId(!entryList[0]?.$id ? null : entryList?.slice(-1)[0].$id);
	};

	const loadMore = () => {
		setIsLoadingMore(true);
		loadTransactions(true);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		loadTransactions(false);
	};

	useEffect(() => {
		loadTransactions(false);
	}, []);

	function updateItemInList(doc) {
		const newList = list.map((d) => {
			if (d.$id === doc.$id) return doc;
			return d;
		});
		setList(newList);
	}

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="flex gap-5 justify-between flex-wrap"
			>
				<StatusDropdown
					value={query.status}
					onChange={(e) =>
						setQuery({ ...query, status: e.target.value })
					}
					isLoading={isLoading}
				/>
				<DateInput
					value={query.date}
					onChange={(e) =>
						setQuery({ ...query, date: e.target.value })
					}
					isLoading={isLoading}
				/>
			</form>

			<div className="overflow-x-auto">
				{isLoading ? (
					<div className="flex flex-col items-center mt-4">
						<div>
							<span className="loading loading-ball"></span>
						</div>
						<p>Loading...</p>
					</div>
				) : (
					list &&
					list.length > 0 && (
						<table className="table table-zebra">
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
								{/* row 1 */}
								{list.map((d, i) => (
									<ListItem
										key={d.$id}
										doc={d}
										count={i + 1}
										update={updateItemInList}
									/>
								))}
							</tbody>
						</table>
					)
				)}
			</div>
			<div className="mt-2 text-right">
				{!isLoading && list && list.length > 0 && (
					<button
						disabled={isLoading || isLoadingMore}
						className="btn btn-primary"
						onClick={loadMore}
					>
						Load More
					</button>
				)}
			</div>
		</>
	);
}

export default ListWrapper;

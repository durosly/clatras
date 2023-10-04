"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import ListItem from "./ListItem";
import toast from "react-hot-toast";

function UsersListWrapper() {
	const [list, setList] = useState([]);
	const [query, setQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [lastId, setLastId] = useState(null);

	const loadTransactions = useCallback(
		async (loadMore) => {
			if (isLoading) return;
			if (loadMore && isLoadingMore) return;

			if (loadMore) {
				setIsLoadingMore(true);
			} else {
				setIsLoading(true);
			}
			try {
				const response = await axios.get(`/api/admin/users`, {
					params: {
						query,
						lastId,
					},
				});

				console.log(response.data);

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
				if (loadMore) {
					setIsLoadingMore(false);
				} else {
					setIsLoading(false);
				}
			}
		},
		[query, isLoadingMore, isLoading, lastId]
	);

	useEffect(() => {
		if (query !== "") {
			setLastId(null);
		}
	}, [query]);

	const handleNewList = (entryList) => {
		setList(entryList);
		setLastId(!entryList[0]?.$id ? null : entryList?.slice(-1)[0].$id); // if there is
	};

	const handleMoreList = (entryList) => {
		setList((prevList) => [...prevList, ...entryList]);

		setLastId(!entryList[0]?.$id ? null : entryList?.slice(-1)[0].$id);
	};

	const loadMore = () => {
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
				<div className="form-control">
					<input
						className="input input-bordered"
						type="search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Name, E-mail, or phone..."
					/>
				</div>
				<button className="btn btn-primary">Search</button>
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
									<th>Name</th>
									<th>Contact</th>
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
										count={list.length - i}
										update={updateItemInList}
									/>
								))}
								{isLoadingMore && (
									<tr>
										<td colSpan={5}>
											<span className="loading loading-ball"></span>{" "}
											<span>Loading...</span>
										</td>
									</tr>
								)}
							</tbody>
						</table>
					)
				)}
			</div>
			<div>
				<button
					onClick={loadMore}
					disabled={isLoadingMore}
					className="btn btn-primary"
				>
					Load More
				</button>
			</div>
		</>
	);
}

export default UsersListWrapper;

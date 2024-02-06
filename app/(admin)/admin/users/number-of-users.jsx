"use client";

import axios from "axios";
import { useEffect, useState } from "react";

function NumberOfUsers() {
	const [numberOfUsers, setNumberOfUsers] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function getNumberOfUsers() {
			if (isLoading) return;
			setIsLoading(true);
			try {
				const response = await axios.get("/api/admin/users/count");

				if (response.data.status) {
					setNumberOfUsers(response.data.total);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		}

		getNumberOfUsers();
	}, []);

	return <span className="text-sm">({numberOfUsers})</span>;
}

export default NumberOfUsers;

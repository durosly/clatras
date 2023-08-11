import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function calculateReturns(type, amt, fee) {
	if (type === "crypto") {
		return Number(amt * fee).toFixed(2);
	} else if (type === "account") {
		return Number(amt - fee).toFixed(2);
	}

	return 1;
}

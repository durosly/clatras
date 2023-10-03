import createPaymentAccount from "./createPaymentAccount";
import updatePaymentAccount from "./update-payment-account";
import deletePaymentAccount from "./delete-payment-account";
export const dynamic = "force-dynamic";
export {
	createPaymentAccount as POST,
	updatePaymentAccount as PUT,
	deletePaymentAccount as DELETE,
};

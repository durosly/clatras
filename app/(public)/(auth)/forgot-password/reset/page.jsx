import { Suspense } from "react";
import ResetForm from "./components/reset-form";

function PasswordResetPage() {
	return (
		<div>
			<h1 className="text-2xl font-bold text-center mb-5">
				Enter new password
			</h1>
			<Suspense>
				<ResetForm />
			</Suspense>
		</div>
	);
}

export default PasswordResetPage;

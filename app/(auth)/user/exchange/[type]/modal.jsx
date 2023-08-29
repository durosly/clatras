"use client";
import Link from "next/link";
import { BsPatchCheck } from "react-icons/bs";
import { createPortal } from "react-dom";

function ExchangeSuccessModal() {
	return (
		<>
			{createPortal(
				<dialog
					id="my_modal_5"
					className="modal modal-open modal-bottom sm:modal-middle backdrop-blur-md"
				>
					<div className="modal-box space-y-5">
						<div>
							<BsPatchCheck className="mx-auto fill-success w-20 h-20" />
						</div>
						<div className="text-center mt-4">
							<h3 className="font-bold text-lg">Sent</h3>
							<p>
								Transaction request has been sent and you would
								be notified via email on completion
							</p>
						</div>
						<div className="space-y-2">
							<Link
								href="/user"
								className="btn btn-sm btn-block"
							>
								Home
							</Link>
						</div>
						<div className="mt-12 sm:hidden"></div>
					</div>
				</dialog>,
				document.getElementById("modal-container")
			)}
		</>
	);
}

export default ExchangeSuccessModal;

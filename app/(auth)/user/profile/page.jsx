import { FaUser } from "react-icons/fa";
import ProfileDisplay from "./components/profile-display";

function UserProfilePage() {
	return (
		<div className="mx-5 sm:mx-10 py-5 space-y-4">
			<ProfileDisplay />
			<div className="border p-5 rounded-md">
				<div className="flex gap-2 items-center">
					<h2 className="font-bold">Update Password</h2>
				</div>
				<div className="mt-4">
					<form>
						<div className="form-control">
							<label
								htmlFor="password"
								className="label"
							>
								New password
							</label>
							<input
								className="input input-bordered"
								id="password"
								type="password"
							/>
						</div>
						<div className="mt-3">
							<button className="btn btn-neutral">Update</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default UserProfilePage;

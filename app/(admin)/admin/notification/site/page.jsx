import Link from "next/link";
import AdminNoticeDisplay from "../components/notifications";

function SiteNotifications() {
	return (
		<div>
			<h1>Site Notifications</h1>
			<Link
				href="/admin/notification/site/create"
				className="btn btn-primary"
			>
				Add new
			</Link>
			<div className="my-5">
				<AdminNoticeDisplay />
			</div>
		</div>
	);
}

export default SiteNotifications;

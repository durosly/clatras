import nodemailer from "nodemailer";
import path from "path";

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		// TODO: replace `user` and `pass` values from <https://forwardemail.net>
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
});

async function getTemplate(...paths) {
	const host = process.env.NEXT_PUBLIC_URL;
	const pathUrl = path.join(host, "email_templates", ...paths);

	let response = await fetch(pathUrl);

	return response.text();
}

export { getTemplate };

export default transporter;

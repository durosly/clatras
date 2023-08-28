import transporter, { getTemplate } from "@/lib/mailer";

async function sendEmail(users, title, message) {
	let email = await getTemplate("user.html");
	email = email.replace(/\[title\]/g, title);
	email = email.replace(/\[message\]/g, message);

	await transporter.sendMail({
		from: `Clatras <${process.env.SMTP_USER}>`,
		to: users,
		subject: `Clatras - ${title}`,
		html: email,
	});
}

export default sendEmail;

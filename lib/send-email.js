import transporter, { getTemplate } from "@/lib/mailer";

async function sendEmail(users, title, message, details, footer) {
	let email = await getTemplate("notice.html");
	email = email.replace(/\[title\]/g, title);
	email = email.replace(/\[message\]/g, message);
	email = email.replace(/\[details\]/g, details);
	email = email.replace(/\[footer\]/g, footer);

	await transporter.sendMail({
		from: `Clatras <${process.env.SMTP_USER}>`,
		to: users,
		subject: `Clatras - ${title}`,
		html: email,
	});
}

export default sendEmail;

import { pick } from "lodash";

function convertObjToMessage(obj, level) {
	let emailMessage = `
	<ul
		style="
			line-height: 1.2;
			mso-line-height-alt: 16.8px;
			letter-spacing: normal;
			font-size: 14px;
		"
	>
      `;
	let newObj = { ...obj };

	if (level === "user") {
		newObj = pick(obj, [
			"item_name",
			"description",
			"type",
			"status",
			"amount",
			"market",
		]);
	}

	for (const key in newObj) {
		emailMessage += `<li
		style="
			text-align: left;
		"
	>
	${key.replace("_", " ")}:
		<strong
			>${newObj[key]}</strong
		>
	</li>`;
	}

	emailMessage += `</ul>`;

	return emailMessage;
}

export default convertObjToMessage;

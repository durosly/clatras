import { pick } from "lodash";

function convertObjToMessage(obj, level) {
	let emailMessage = `
        <h4>Details</h4>
    <ul>`;
	let newObj = { ...obj };

	if (level === "user") {
		newObj = pick(obj, [
			"item_name",
			"description",
			"type",
			"status",
			"amount",
		]);
	}

	for (const key in newObj) {
		emailMessage += `<li>${key.replace("_", " ")}: ${newObj[key]}</li>`;
	}

	emailMessage += `</ul>`;

	return emailMessage;
}

export default convertObjToMessage;

import { AiOutlineGoogle } from "react-icons/ai";
import GoogleVoiceDetails from "./gv-display";

function GoogleVoiceSetupPage() {
	return (
		<div>
			<div className="flex gap-2 items-center">
				<span className="w-8 aspect-square rounded-full flex justify-center items-center">
					<AiOutlineGoogle className="w-5 h-5" />
				</span>
				<h2 className="font-bold">Google Voice</h2>
			</div>
			<GoogleVoiceDetails />
		</div>
	);
}

export default GoogleVoiceSetupPage;

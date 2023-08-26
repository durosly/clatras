import { MdOutlineVerifiedUser } from "react-icons/md";

function Loading() {
	return (
		<div className="max-w-[400px] mx-auto mt-10 border px-8 rounded-md py-10 space-y-10 mb-10">
			<div className="text-center mb-10">
				<div className="w-14 mx-auto aspect-square rounded-full bg-primary/10 flex justify-center items-center">
					<MdOutlineVerifiedUser className="w-7 h-7" />
				</div>
				<h2 className="uppercase font-bold">Verification</h2>
				<p className="text-xs">Purchase verification accounts</p>
				<h2 className="uppercase font-bold bg-slate-400 animate-pulse mt-10">
					&nbsp;
				</h2>
			</div>
			<div className="h-10 bg-slate-400 animate-pulse"></div>
			<div className="h-10 bg-slate-400 animate-pulse"></div>
		</div>
	);
}

export default Loading;

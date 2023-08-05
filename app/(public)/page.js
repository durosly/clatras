import Image from "next/image";
import Link from "next/link";
import cover from "@/images/cover.jpg";
import Jet from "@/svg/illustrations/jet";
import Spiral from "@/svg/illustrations/spiral";
import Streamer from "@/svg/illustrations/streamer";
import UserJoin from "@/svg/illustrations/user-join";

export default function Home() {
	return (
		<main>
			<div className="h-[80vh] flex justify-center">
				<div className="flex items-center max-w-6xl">
					<div className="flex-1 space-y-3">
						<h2 className="text-8xl font-bold">
							Smart Financial Service
						</h2>
						<p>
							Your one stop shop to online payments and related
							transactions
						</p>
						<div>
							<Link
								className="btn btn-wide btn-primary rounded-full"
								href="/nice"
							>
								Join US
							</Link>
						</div>
					</div>
					<div className="flex-1">
						<div className="relative">
							<Image
								src={cover}
								alt="cover"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* services logos */}
			<div className="px-10">
				<ul className="flex justify-center gap-3">
					<li className="flex gap-4 p-3 rounded-full border items-center">
						<span className="inline-block w-4 h-4 rounded-full bg-green-500"></span>
						<span>Zelle</span>
						<span className="inline-block w-4 h-4 rounded-full bg-green-500"></span>
					</li>
					<li className="flex gap-4 p-3 rounded-full border items-center">
						<span className="inline-block w-4 h-4 rounded-full bg-blue-500"></span>
						<span>Gift Cards</span>
						<span className="inline-block w-4 h-4 rounded-full bg-blue-500"></span>
					</li>
					<li className="flex gap-4 p-3 rounded-full border items-center">
						<span className="inline-block w-4 h-4 rounded-full bg-red-500"></span>
						<span>Paypal</span>
						<span className="inline-block w-4 h-4 rounded-full bg-red-500"></span>
					</li>
					<li className="flex gap-4 p-3 rounded-full border items-center">
						<span className="inline-block w-4 h-4 rounded-full bg-primary"></span>
						<span>Bitcoin</span>
						<span className="inline-block w-4 h-4 rounded-full bg-primary"></span>
					</li>
					<li className="flex gap-4 p-3 rounded-full border items-center">
						<span className="inline-block w-4 h-4 rounded-full bg-pink-500"></span>
						<span>Zelle</span>
						<span className="inline-block w-4 h-4 rounded-full bg-pink-500"></span>
					</li>
				</ul>
			</div>

			<div className="min-h-screen flex justify-center items-center">
				<div className="flex justify-between gap-20 max-w-4xl ">
					<div className="flex-1 space-y-4">
						<h3 className="text-5xl w-2/3 border-l-4  pl-10">
							Make online transactions with ease
						</h3>
						<p className="px-3">
							Transactions are super fast and is completed in only
							but a few clicks. Once you have an account with us,
							you enjoy seamless transactions.
						</p>
					</div>
					<div className="flex-1">
						<div className="bg-primary space-y-5 p-10 rounded-2xl">
							<div className="flex justify-center items-center w-full">
								<Jet className="w-full max-w-[200px] h-auto" />
							</div>
							<p className="flex justify-center gap-4 items-center">
								<span className="badge p-4 border ">Speed</span>
								<span>&</span>
								<span className="badge p-4 border ">
									Efficiency
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="min-h-screen relative ">
				<div className="bg-primary pointer-events-none absolute left-20 aspect-square w-96 rounded-full opacity-20 blur-3xl "></div>
				<div className="relative max-w-4xl mx-auto">
					<div>
						<p className="max-w-sm">
							Easily make payments without constraints or
							limitations of your traditional banks
						</p>
					</div>
					<div className="my-20 relative">
						<Streamer className="h-14 absolute -top-20 right-16 animate-bounce delay-300 pointer-events-none" />
						<p className="text-6xl max-w-md mx-auto">
							We are experts for online transactions
						</p>
						<Spiral className="h-24 absolute -bottom-20 left-16 animate-bounce pointer-events-none" />
					</div>
					<div className="flex justify-end">
						<p className="max-w-sm">
							Easily make payments without constraints or
							limitations of your traditional banks
						</p>
					</div>
				</div>
				<div className="bg-secondary pointer-events-none absolute right-20 bottom-10 aspect-square w-40 rounded-full opacity-50 blur-3xl "></div>
			</div>
			<div className="bg-primary h-[200px] relative mt-5 mb-32">
				<div className="relative max-w-4xl h-full mx-auto flex items-center">
					<div className="absolute top-1/2 -translate-y-1/2">
						<UserJoin className="h-96 " />
					</div>
					<div className="ml-auto space-y-4">
						<div>
							<h2 className="text-2xl font-bold">
								Join us today
							</h2>
							<p>
								Registered user&apos;s enjoy our services
								seamlessly
							</p>
						</div>
						<Link
							className="btn btn-outline"
							href="/nice"
						>
							Get Started
							<span className="text-lg">
								<span className="animate-pulse">&gt;</span>
								<span className="animate-pulse delay-500">
									&gt;
								</span>
								<span className="animate-pulse delay-1000">
									&gt;
								</span>
							</span>
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}

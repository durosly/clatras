import Image from "next/image";
import Link from "next/link";
import cover from "@/images/cover.jpg";
import Jet from "@/svg/illustrations/jet";
import Spiral from "@/svg/illustrations/spiral";
import Streamer from "@/svg/illustrations/streamer";
import UserJoin from "@/svg/illustrations/user-join";

export default function Home() {
	return (
		<main className="">
			<div className="flex justify-center px-10">
				<div className="md:flex mt-20 items-center max-w-6xl">
					<div className=" max-h-[700px] md:h-auto md:flex-1 text-center md:text-left space-y-14 md:space-y-3 mb-10">
						<div className="mb-5">
							<h2 className="max-[340px]:text-4xl text-6xl md:text-8xl font-bold mb-5 md:mb-0">
								Smart Financial Service
							</h2>
							<p>
								Your one stop shop to online payments and
								related transactions
							</p>
						</div>
						<div>
							<Link
								className="btn btn-md md:btn-wide btn-primary rounded-full"
								href="/login"
							>
								Join US
							</Link>
						</div>
					</div>
					<div className="flex-1">
						<div className="relative w-10/12 mx-auto md:mx-0 sm:w-auto">
							<Image
								src={cover}
								alt="cover"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* services logos */}
			<div className="px-10 mt-10 md:mt-0">
				<ul className="flex flex-wrap justify-center gap-3">
					<li className="flex text-sm md:text-base gap-2 md:gap-4 p-1 md:p-3 rounded-full border items-center">
						<span className="inline-block w-4 h-4 rounded-full bg-green-500"></span>
						<span>Zelle</span>
						<span className="inline-block w-4 h-4 rounded-full bg-green-500"></span>
					</li>
					<li className="flex text-sm md:text-base gap-2 md:gap-4 p-1 md:p-3 rounded-full border items-center">
						<span className="inline-block w-4 h-4 rounded-full bg-blue-500"></span>
						<span>Gift Cards</span>
						<span className="inline-block w-4 h-4 rounded-full bg-blue-500"></span>
					</li>
					<li className="flex text-sm md:text-base gap-2 md:gap-4 p-1 md:p-3 rounded-full border items-center">
						<span className="inline-block w-4 h-4 rounded-full bg-red-500"></span>
						<span>Paypal</span>
						<span className="inline-block w-4 h-4 rounded-full bg-red-500"></span>
					</li>
					<li className="flex text-sm md:text-base gap-2 md:gap-4 p-1 md:p-3 rounded-full border items-center">
						<span className="inline-block w-4 h-4 rounded-full bg-primary"></span>
						<span>Bitcoin</span>
						<span className="inline-block w-4 h-4 rounded-full bg-primary"></span>
					</li>
					<li className="flex text-sm md:text-base gap-2 md:gap-4 p-1 md:p-3 rounded-full border items-center">
						<span className="inline-block w-4 h-4 rounded-full bg-pink-500"></span>
						<span>Zelle</span>
						<span className="inline-block w-4 h-4 rounded-full bg-pink-500"></span>
					</li>
				</ul>
			</div>

			<div className="mt-40 md:mt-0 md:min-h-screen flex justify-center items-center">
				<div className="md:flex px-5 justify-between gap-20 space-y-4 max-w-4xl">
					<div className="flex-1 space-y-4">
						<h3 className="text-3xl md:text-5xl md:w-2/3 border-l-4 border-l-primary pl-5 md:pl-10">
							Make online transactions with ease
						</h3>
						<p className="md:px-3 text-justify">
							Transactions are super fast and is completed in only
							but a few clicks. Once you have an account with us,
							you enjoy seamless transactions.
						</p>
					</div>
					<div className="flex-1">
						<div className="bg-primary space-y-5 p-5 md:p-10 rounded-2xl">
							<div className="flex justify-center items-center md:w-full">
								<Jet className="md:w-full max-w-[80px] md:max-w-[200px] h-auto" />
							</div>
							<p className="flex flex-wrap justify-center gap-4 items-center">
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

			<div className="md:min-h-screen relative my-40 px-5">
				<div className="bg-primary pointer-events-none absolute left-20 aspect-square w-28 md:w-96 rounded-full opacity-20 blur-3xl "></div>
				<div className="relative md:max-w-4xl mx-auto">
					<div>
						<p className="max-w-sm text-center md:text-left text-xs sm:text-sm md:text-base">
							Easily make payments without constraints or
							limitations of your traditional banks
						</p>
					</div>
					<div className="my-20 relative">
						<Streamer className="h-5 md:h-14 absolute -top-20 right-16 animate-bounce delay-300 pointer-events-none" />
						<p className="text-2xl font-bold md:font-normal text-center md:text-left md:text-6xl max-w-md mx-auto">
							We are experts for online transactions
						</p>
						<Spiral className="h-7 md:h-24 absolute -bottom-20 left-16 animate-bounce pointer-events-none" />
					</div>
					<div className="md:flex justify-end">
						<p className="max-w-sm text-center md:text-left text-xs sm:text-sm md:text-base">
							Easily make payments without constraints or
							limitations of your traditional banks
						</p>
					</div>
				</div>
				<div className="bg-primary pointer-events-none absolute right-20 bottom-10 aspect-square w-40 rounded-full opacity-50 blur-3xl "></div>
			</div>

			<div className="bg-primary md:h-[200px] px-5 py-10 md:py-0 relative mt-5 mb-32">
				<div className="relative max-w-4xl h-full mx-auto md:flex items-center">
					<div className="md:absolute top-1/2 md:-translate-y-1/2">
						<UserJoin className="h-48 mx-auto md:h-96 " />
					</div>
					<div className="md:ml-auto text-center md:text-left space-y-4">
						<div className="mt-5 md:mt-0">
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
							href="/login"
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

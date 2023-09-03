import Image from "next/image";
import Link from "next/link";
import cover from "@/images/cover.jpg";
import Jet from "@/svg/illustrations/jet";
import Spiral from "@/svg/illustrations/spiral";
import Streamer from "@/svg/illustrations/streamer";
import UserJoin from "@/svg/illustrations/user-join";
import { CgCreditCard } from "react-icons/cg";
import { RiCustomerService2Fill } from "react-icons/ri";
import { MdCurrencyExchange, MdSecurity } from "react-icons/md";
import { BiSolidPieChart } from "react-icons/bi";
import { AiOutlineLineChart, AiOutlineTag } from "react-icons/ai";
import { GrLineChart } from "react-icons/gr";

export default function Home() {
	return (
		<main className="">
			<div className="flex justify-center px-10">
				<div className="md:flex mt-20 items-center max-w-6xl">
					<div className=" max-h-[700px] md:h-auto md:flex-1 text-center md:text-left space-y-14 md:space-y-3 mb-10">
						<div className="mb-5">
							<h2 className="max-[340px]:text-3xl text-5xl md:text-7xl font-bold mb-5 md:mb-0">
								Enjoy a hassle-free Payment Process
							</h2>
							<p>
								Sell your bitcoins, buy Google Voice accounts,
								and make unlimited international transactions in
								just a few clicks
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
						<span>CashApp</span>
						<span className="inline-block w-4 h-4 rounded-full bg-pink-500"></span>
					</li>
				</ul>
			</div>

			<div className="bg-primary my-20 p-10">
				<div className="max-w-4xl mx-auto">
					<h3 className="text-xl sm:text-3xl md:text-6xl font-bold mb-4">
						Why choose us?
					</h3>
					<p>
						Clatras is the leading crypto exchange company that
						offers a fast, secure, and user-friendly platform for
						buying bitcoins and other cryptocurrencies from you. You
						can own a google voice account at affordable rates and
						make International transaction without limit.
					</p>
				</div>
			</div>

			<div className="max-w-4xl mx-auto px-5 sm:px-10">
				<h3 className="text-xl sm:text-2xl font-bold mb-4 text-center">
					Experience the convenience and reliability of our services.
				</h3>
				<div className="flex flex-col sm:flex-row flex-wrap justify-center items-center sm:items-stretch gap-5 ">
					<div className="card sm:w-1/3 flex-1 sm:max-w-[300px] bg-black/5 p-5">
						<div>
							<h4 className="font-bold mb-2 flex items-center gap-2">
								<MdCurrencyExchange className="w-5 h-5 flex-shrink-0" />
								<span>Sell your bitcoins</span>
							</h4>
							<p className="text-sm">
								We offer competitive rates for buying your
								bitcoins and ensure a seamless transaction
								process directly to your bank account.
							</p>
						</div>
						<svg
							viewBox="0 -960 960 960"
							xmlns="http://www.w3.org/2000/svg"
							className="absolute bottom-4 right-4 w-10 h-10 opacity-10"
						>
							<path d="M226-160q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226-414q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226-668q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Z"></path>
						</svg>
					</div>
					<div className="card sm:w-1/3 flex-1 sm:max-w-[300px] bg-black/5 p-5">
						<div>
							<h4 className="font-bold mb-2 flex items-center gap-2">
								<AiOutlineTag className="w-5 h-5 flex-shrink-0" />
								<span>Get accounts at unbeatable prices</span>
							</h4>

							<p className="text-sm">
								Purchase Google Voice accounts and international
								numbers suitable for any form of verification,
								delivered directly to your email at a fair
								prices.
							</p>
						</div>
						<svg
							viewBox="0 -960 960 960"
							xmlns="http://www.w3.org/2000/svg"
							className="absolute bottom-4 right-4 w-10 h-10 opacity-10"
						>
							<path d="M226-160q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226-414q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226-668q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Z"></path>
						</svg>
					</div>
					<div className="card sm:w-1/3 flex-1 sm:max-w-[300px] bg-black/5 p-5">
						<div>
							<h4 className="font-bold mb-2 flex items-center gap-2">
								<AiOutlineLineChart className="w-5 h-5 flex-shrink-0" />
								<span>
									Unlimited international transactions
								</span>
							</h4>

							<p className="text-sm">
								With Clatras, there are no limits when it comes
								to making international transactions. Expand
								your business horizons without any boundaries
								and recieve payment from anywhere in the world.
							</p>
						</div>
						<svg
							viewBox="0 -960 960 960"
							xmlns="http://www.w3.org/2000/svg"
							className="absolute bottom-4 right-4 w-10 h-10 opacity-10"
						>
							<path d="M226-160q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226-414q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19ZM226-668q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Zm254 0q-28 0-47-19t-19-47q0-28 19-47t47-19q28 0 47 19t19 47q0 28-19 47t-47 19Z"></path>
						</svg>
					</div>
				</div>
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
						<div className="bg-primary space-y-5 p-10 rounded-2xl">
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

			<div className=" px-5 my-20">
				<div className="max-w-4xl mx-auto">
					<h2 className="font-bold text-xl mb-5">
						What you&quot;ll get
					</h2>
					<div className="space-y-4">
						<div className="border p-5 sm:p-10 card">
							<div className="flex gap-5 items-center mb-5 sm:mb-0">
								<div className="w-14 bg-primary/10 aspect-square rounded-full relative">
									<CgCreditCard className="w-10 h-10 absolute -right-3 top-1/2 -translate-y-1/2 drop-shadow-lg" />
								</div>
								<h3 className="font-bold">
									Seamless payment process
								</h3>
							</div>
							<p className="sm:pl-10">
								Say goodbye to long waiting times and experience
								the convenience of instant transactions. With
								our advanced technology, we have ensured that
								every transaction is completed quickly and
								seamlessly.
							</p>
						</div>
						<div className="border p-5 sm:p-10 card">
							<div className="flex gap-5 items-center mb-5 sm:mb-0">
								<div className="w-14 bg-primary/10 aspect-square rounded-full relative">
									<RiCustomerService2Fill className="w-10 h-10 absolute -right-3 top-1/2 -translate-y-1/2 drop-shadow-lg" />
								</div>
								<h3 className="font-bold">
									24/7 customer service
								</h3>
							</div>
							<p className="sm:pl-10">
								Get the support you need, whenever you need it.
								Our dedicated customer service team is available
								round-the-clock to answer any questions or
								resolve any issues you may have.
							</p>
						</div>
						<div className="border p-5 sm:p-10 card">
							<div className="flex gap-5 items-center mb-5 sm:mb-0">
								<div className="w-14 bg-primary/10 aspect-square rounded-full relative">
									<MdSecurity className="w-10 h-10 absolute -right-3 top-1/2 -translate-y-1/2 drop-shadow-lg" />
								</div>
								<h3 className="font-bold">
									Top-Notch Security
								</h3>
							</div>
							<p className="sm:pl-10">
								At Clatras, we ensure top-notch measures to
								ensure that your funds and personal information
								are protected at all times. Trade with
								confidence knowing that you are in safe hands.
							</p>
						</div>
						<div className="border p-5 sm:p-10 card">
							<div className="flex gap-5 items-center mb-5 sm:mb-0">
								<div className="w-14 bg-primary/10 aspect-square rounded-full relative">
									<BiSolidPieChart className="w-10 h-10 absolute -right-3 top-1/2 -translate-y-1/2 drop-shadow-lg" />
								</div>
								<h3 className="font-bold">
									Affordable rates for You
								</h3>
							</div>
							<p className="sm:pl-10">
								Enjoy cryptocurrencies at fair prices. Start
								trading with Clatras today and experience the
								benefits of affordable crypto transactions.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="md:min-h-screen relative my-20  px-5">
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
							Purchase Ecode, google voice, and many more with
							ease
						</p>
					</div>
				</div>
				<div className="bg-primary pointer-events-none absolute right-20 bottom-10 aspect-square w-40 rounded-full opacity-50 blur-3xl "></div>
			</div>

			<div className="px-5 sm:mb-40">
				<div className="max-w-4xl mx-auto">
					<div className="mb-4">
						<h2 className="font-bold text-xl">Who We Are</h2>
						<p>
							Clatras is a trusted name in the crypto exchange
							industry. With 5 years of experience and a strong
							track record, we have built a reputation for
							providing reliable and efficient services to our
							customers. Join us and experience the Clatras
							difference.
						</p>
					</div>
					<div className="flex flex-col sm:flex-row gap-4">
						<div className="flex-1 card border p-5">
							<h3 className="font-bold mb-2">
								We Are Reliable🛡️
							</h3>
							<p className="">
								You can count on us for secure transactions and
								prompt customer support.
							</p>
						</div>
						<div className="flex-1 card border p-5">
							<h3 className="font-bold mb-2">
								We Are Transparent🪟
							</h3>
							<p className="">
								We believe in keeping our customers informed
								every step of the way, ensuring clarity and
								peace of mind.
							</p>
						</div>
						<div className="flex-1 card border p-5">
							<h3 className="font-bold mb-2">
								We Are Committed to Your Success📈
							</h3>
							<p className="">
								We are committed to helping you achieve your
								financial goals by providing top-notch services
								and opportunities that unlock your potential.
							</p>
						</div>
					</div>
				</div>
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

import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Clatras",
	description:
		"Your one stop shop to online payments and related transactions",
	applicationName: "Clatras",
	keywords: ["Crypto", "PI coin", "Bitcoin"],
	metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
	themeColor: "#00eaaf",
	openGraph: {
		title: "Clatras exchange",
		description:
			"Your one stop shop to online payments and related transactions",

		siteName: "Clatras",
		images: "/meta/open-graph.png",
		locale: "en_US",
		type: "website",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${inter.className}`}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}

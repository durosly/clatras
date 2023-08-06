import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Clatras",
	description:
		"Your one stop shop to online payments and related transactions",
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

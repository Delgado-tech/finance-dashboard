import AuthLayoutTemplate from "@/components/templates/AuthLayoutTemplate";
import getAuthorization from "@/utils/getAuthorization";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	if (!(await getAuthorization()).success) {
		//redirect("/login");
	}

	const username = "Leonardo";

	return (
		<html lang="pt-br">
			<body className={inter.className}>
				<AuthLayoutTemplate username={username}>{children}</AuthLayoutTemplate>
			</body>
		</html>
	);
}

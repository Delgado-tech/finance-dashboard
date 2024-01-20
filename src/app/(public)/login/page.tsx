import LoginTemplate from "@/components/templates/LoginTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login",
	description: "Generated by create next app",
};

export default async function LoginPage() {
	return <LoginTemplate />;
}

import RegisterTemplate from "@/components/templates/RegisterTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Cadastro",
	description: "Generated by create next app",
};

export default function RegisterPage() {
	return <RegisterTemplate />;
}

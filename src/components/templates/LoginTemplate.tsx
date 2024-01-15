"use client";

import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CheckboxField from "../molecules/CheckboxField";
import Button from "../atoms/button";
import TraceText from "../atoms/TraceText";
import TextLogo from "../atoms/TextLogo";
import InputRoot from "../atoms/input/InputRoot";
import InputLabelToTop from "../atoms/input/InputLabelToTop";
import InputPasswordIcon from "../atoms/input/InputPasswordIcon";
import InputBody from "../atoms/input/InputBody";
import InputPasswordField from "../molecules/InputPasswordField";

export default function LoginTemplate() {
	const [divsToRecentrilize, setDivsToRecentrilize] = useState<string[]>([]);

	const loginSectionId = "login-section";

	useEffect(() => {
		setDivsToRecentrilize((prev) => [
			...prev.filter((id) => id !== loginSectionId),
			loginSectionId!,
		]);
	}, []);

	useEffect(() => {
		const resizeHandler = () => {
			divsToRecentrilize.forEach((id) => {
				const target = document.getElementById(id)!;
				if (target.clientHeight - target.scrollHeight < 0) {
					target.classList.replace("items-center", "items-start");
				} else {
					target.classList.replace("items-start", "items-center");
				}
			});
		};

		resizeHandler();

		window.addEventListener("resize", resizeHandler);

		return () => {
			window.removeEventListener("resize", resizeHandler);
		};
	}, [divsToRecentrilize]);

	return (
		<section
			id={loginSectionId}
			className="w-full h-screen flex justify-center items-center overflow-auto"
		>
			<main className="px-4 py-8 w-[clamp(100px,_100%,_400px)]">
				{/* logo */}
				<TextLogo />

				{/* formulário */}
				<form className="flex flex-col gap-6">
					{/* input email */}
					<div className="flex flex-col gap-2">
						<div className="relative">
							<span className="absolute rounded-lg bg-zinc-100 -translate-y-1/2 px-2 left-2 cursor-pointer text-zinc-500">
								<label className="font-medium" htmlFor="email">
									E-mail
								</label>
							</span>
							<input
								id="email"
								type="email"
								name="email"
								className="outline-none rounded-lg pl-4 pr-10 py-3 border text-zinc-600 border-zinc-400 focus:border-teal-600 bg-transparent w-full"
							/>
						</div>
					</div>

					{/* input senha */}
					<InputPasswordField id="password" />

					<CheckboxField id={"checkbox"} name={"remember_me"} />

					{/* botão de logar */}
					<Button.Root className="bg-teal-600 hover:bg-teal-500" type="submit">
						<Button.Content text="Entrar" className="text-white" />
					</Button.Root>

					<TraceText text="ou entrar com" className="my-2" />

					{/* botão de logar com o google */}
					<Button.Root className="mb-4">
						<Button.Icon
							icon={
								<Image
									src={"/svg/icon-google.svg"}
									alt={"logo"}
									width={24}
									height={24}
								/>
							}
						/>
						<Button.Content text="Continuar com Google" />
					</Button.Root>

					<span className="text-center">
						<Link
							href={"/register"}
							className="font-medium text-teal-600 hover:text-teal-500 transition-colors"
						>
							Criar uma conta
						</Link>
					</span>
				</form>
			</main>
		</section>
	);
}

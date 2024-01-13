"use client";

import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CheckboxField from "../molecules/CheckboxField";
import Button from "../atoms/button";

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
				<h1 className="font-poppins text-5xl text-teal-600 mb-16 text-center">
					<span className="font-extrabold">FINE</span>bank.
					<span className="font-extrabold">IO</span>
				</h1>
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
					<div className="flex flex-col gap-2 mb-4">
						<span className="text-end">
							<Link
								href={"/register"}
								className="text-sm font-medium text-teal-600 hover:text-teal-500 transition-colors"
							>
								Esqueceu a senha?
							</Link>
						</span>
						<div className="relative">
							<span className="absolute rounded-lg bg-zinc-100 -translate-y-1/2 px-2 left-2 cursor-pointer text-zinc-500">
								<label className="font-medium" htmlFor="password">
									Senha
								</label>
							</span>
							<span className="absolute m-auto top-1/2 -translate-y-1/2 right-3 cursor-pointer text-zinc-500">
								<Eye />
								{/* <EyeOff /> */}
							</span>
							<input
								id="password"
								type="password"
								name="password"
								className="outline-none rounded-lg pl-4 pr-10 py-3 border text-zinc-600 border-zinc-400 focus:border-teal-600 bg-transparent w-full"
							/>
						</div>
					</div>

					<CheckboxField id={"checkbox"} name={"remember_me"} />

					{/* botão de logar */}
					<Button.Root className="bg-teal-600 hover:bg-teal-500" type="submit">
						<Button.Content text="Entrar" className="text-white" />
					</Button.Root>

					<span className="relative flex items-center justify-center my-2">
						<span className="text-zinc-400 text-sm bg-zinc-100 px-2">
							ou entrar com
						</span>
						<span className="absolute bg-zinc-300 w-[calc(100%-2rem)] h-[1px] left-4 -z-10" />
					</span>

					{/* botão de logar com o google */}
					<Button.Root>
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

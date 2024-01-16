"use client";

import { useEffect, useState } from "react";
import TextLink from "../atoms/TextLink";
import TextLogo from "../atoms/TextLogo";
import TraceText from "../atoms/TraceText";
import GoogleButton from "../molecules/GoogleButton";
import LoginForm from "../organisms/LoginForm";

export default function LoginTemplate() {
	const [divsToRecentrilize, setDivsToRecentrilize] = useState<string[]>([]);

	const sectionId = "login-section";

	useEffect(() => {
		setDivsToRecentrilize((prev) => [
			...prev.filter((id) => id !== sectionId),
			sectionId!,
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
			id={sectionId}
			className="flex h-screen w-full items-center justify-center overflow-auto"
		>
			<main className="flex w-[clamp(100px,_100%,_400px)] flex-col px-4 py-8">
				{/* logo */}
				<TextLogo className="mb-8 md:mb-16" />

				{/* formulário */}
				<LoginForm />

				<TraceText text="ou entrar com" className="my-6" />

				{/* botão de logar com o google */}
				<GoogleButton />

				<TextLink
					text={"Criar uma conta"}
					href="/register"
					className="self-center text-xs md:text-sm"
				/>
			</main>
		</section>
	);
}

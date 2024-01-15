"use client";

import { useEffect, useState } from "react";
import TextLogo from "../atoms/TextLogo";
import LoginForm from "../organisms/LoginForm";

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
				<LoginForm />
			</main>
		</section>
	);
}

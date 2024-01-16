"use client";

import { RecentrilizeProvider } from "@/context/RecentrilizeContext";
import TextLink from "../atoms/TextLink";
import TextLogo from "../atoms/TextLogo";
import TraceText from "../atoms/TraceText";
import GoogleButton from "../molecules/GoogleButton";
import LoginForm from "../organisms/LoginForm";

export default function LoginTemplate() {
	const sectionId = "login-section";

	return (
		<RecentrilizeProvider sectionId={sectionId}>
			<section
				id={sectionId}
				className="flex h-screen w-full items-center justify-center overflow-auto"
			>
				<main className="flex w-[clamp(100px,_100%,_400px)] flex-col px-4 py-8">
					{/* logo */}
					<TextLogo className="mb-8 sm:mb-16" />

					{/* formulário */}
					<LoginForm />

					<TraceText text="ou entrar com" className="my-6" />

					{/* botão de logar com o google */}
					<GoogleButton className="mb-6" />

					<TextLink
						text={"Criar uma conta"}
						href="/register"
						className="self-center text-xs sm:text-sm"
					/>
				</main>
			</section>
		</RecentrilizeProvider>
	);
}

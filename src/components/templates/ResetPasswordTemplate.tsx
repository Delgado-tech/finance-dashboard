"use client";

import { RecentrilizeProvider } from "@/context/RecentrilizeContext";
import TextLink from "../atoms/TextLink";
import TextLogo from "../atoms/TextLogo";
import ResetPasswordForm from "../organisms/ResetPasswordForm";

export default function ResetPasswordTemplate() {
	const sectionId = "login-section";

	return (
		<RecentrilizeProvider sectionId={sectionId}>
			<section
				id={sectionId}
				className="flex h-screen w-full items-center justify-center overflow-auto"
			>
				<main className="flex w-[clamp(100px,_100%,_400px)] flex-col px-4 py-8">
					{/* logo */}
					<TextLogo className="mb-6 sm:mb-12" />

					<div className="mb-6 text-center">
						<h2 className="text-md mb-2 font-medium text-zinc-800 sm:text-lg">
							Esqueceu a senha?
						</h2>
						<p>
							Informe o seu e-mail para podermos enviar nele o link de recuperação de
							senha.
						</p>
					</div>

					{/* formulário */}
					<ResetPasswordForm />

					<TextLink
						text={"Voltar a página de login"}
						href="/login"
						className="mt-6 self-center text-xs text-zinc-400 sm:text-sm"
					/>
				</main>
			</section>
		</RecentrilizeProvider>
	);
}

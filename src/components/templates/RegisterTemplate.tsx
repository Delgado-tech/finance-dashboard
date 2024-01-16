import TextLink from "../atoms/TextLink";
import TextLogo from "../atoms/TextLogo";
import TraceText from "../atoms/TraceText";
import GoogleButton from "../molecules/GoogleButton";
import RegisterForm from "../organisms/RegisterForm";

export default function RegisterTemplate() {
	const sectionId = "login-section";

	return (
		<section
			id={sectionId}
			className="flex h-screen w-full items-center justify-center overflow-auto"
		>
			<main className="flex w-[clamp(100px,_100%,_400px)] flex-col px-4 py-8">
				{/* logo */}
				<TextLogo className="mb-4" />

				<h2 className="text-md mb-8 self-center font-medium text-zinc-800 md:text-xl">
					Cria uma conta
				</h2>

				{/* formulário */}
				<RegisterForm />

				<TraceText text="ou criar com" className="my-6" />

				{/* botão de logar com o google */}
				<GoogleButton />

				<p className="self-center text-xs md:text-sm">
					Já possui uma conta? <TextLink text="Entrar" href="/login" />
				</p>
			</main>
		</section>
	);
}

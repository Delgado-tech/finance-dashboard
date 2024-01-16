import TextLink from "../atoms/TextLink";
import Button from "../atoms/button";
import InputField from "../molecules/InputField";
import InputPasswordField from "../molecules/InputPasswordField";

export default function RegisterForm() {
	return (
		<form className="flex flex-col gap-8">
			{/* input email */}
			<InputField id="text" label="Nome" />

			<InputField id="email" label="E-mail" type="email" />

			{/* input senha */}
			<InputPasswordField id="password" />

			<span>
				<p className="mb-2 text-center text-xs md:text-sm">
					Para prosseguir, você concorda com os <TextLink text="termos de serviço" />
				</p>

				{/* botão de logar */}
				<Button.Root className="bg-teal-600 hover:bg-teal-500" type="submit">
					<Button.Content text="Entrar" className="text-white" />
				</Button.Root>
			</span>
		</form>
	);
}

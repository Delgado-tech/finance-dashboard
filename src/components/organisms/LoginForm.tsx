import TextLink from "../atoms/TextLink";
import Button from "../atoms/button";
import CheckboxField from "../molecules/CheckboxField";
import InputField from "../molecules/InputField";
import InputPasswordField from "../molecules/InputPasswordField";

export default function LoginForm() {
	return (
		<form className="flex flex-col gap-4 sm:gap-8">
			{/* input email */}
			<InputField id="email" label="E-mail" type="email" />

			{/* input senha */}
			<div className="mb-4 flex flex-col gap-1">
				<TextLink
					text={"Esqueceu a senha?"}
					href={"/reset-password"}
					className="self-end text-xs sm:text-sm"
				/>
				<InputPasswordField id="password" />
			</div>

			<CheckboxField id={"checkbox"} name={"remember_me"} />

			{/* botão de logar */}
			<Button.Root className="bg-teal-600 hover:bg-teal-500" type="submit">
				<Button.Content text="Entrar" className="text-white" />
			</Button.Root>
		</form>
	);
}

import Button from "../atoms/button";
import InputField from "../molecules/InputField";

export default function ResetPasswordForm() {
	return (
		<form className="flex flex-col gap-4 sm:gap-8">
			{/* input email */}
			<InputField id="email" label="E-mail" type="email" />

			{/* botão de logar */}
			<Button.Root className="bg-teal-600 hover:bg-teal-500" type="submit">
				<Button.Content text="Resetar senha" className="text-white" />
			</Button.Root>
		</form>
	);
}

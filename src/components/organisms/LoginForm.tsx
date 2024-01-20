import { FinebankAPI } from "@/services/finebankAPI";
import { useState } from "react";
import TextLink from "../atoms/TextLink";
import Button from "../atoms/button";
import CheckboxField from "../molecules/CheckboxField";
import InputField from "../molecules/InputField";
import InputPasswordField from "../molecules/InputPasswordField";

export default function LoginForm() {
	const [invalidMessage, setInvalidMessage] = useState<string>();

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.target as HTMLFormElement;

		const formData = new FormData(form);
		const formObj: any = Object.fromEntries(formData.entries());

		FinebankAPI.Users.login({ email: formObj.email, password: formObj.password })
			.then(() => {})
			.catch((res: Error) => {
				setInvalidMessage(String(res).replace("Error: ", ""));
			});
	};

	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-4 sm:gap-8">
			{invalidMessage && (
				<span className="text-center text-red-500">{invalidMessage}</span>
			)}

			{/* input email */}
			<InputField
				id="email"
				label="E-mail"
				type="email"
				invalid={invalidMessage !== undefined}
				required
			/>

			{/* input senha */}
			<div className="mb-4 flex flex-col gap-1">
				<TextLink
					text={"Esqueceu a senha?"}
					href={"/reset-password"}
					className="self-end text-xs sm:text-sm"
				/>
				<InputPasswordField id="password" invalid={invalidMessage !== undefined} />
			</div>

			<CheckboxField id={"checkbox"} name={"remember_me"} />

			{/* botão de logar */}
			<Button.Root className="bg-teal-600 hover:bg-teal-500" type="submit">
				<Button.Content text="Entrar" className="text-white" />
			</Button.Root>
		</form>
	);
}

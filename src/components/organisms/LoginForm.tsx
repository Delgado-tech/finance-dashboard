import Image from "next/image";
import { ComponentProps } from "react";
import TextLink from "../atoms/TextLink";
import TraceText from "../atoms/TraceText";
import Button from "../atoms/button";
import CheckboxField from "../molecules/CheckboxField";
import InputField from "../molecules/InputField";
import InputPasswordField from "../molecules/InputPasswordField";

interface Props extends ComponentProps<"form"> {}

export default function LoginForm({ className }: Props) {
	return (
		<form className="flex flex-col gap-6">
			{/* input email */}
			<InputField id="email" label="E-mail" type="email" />

			{/* input senha */}
			<div className="flex flex-col gap-1">
				<TextLink text={"Esqueceu a senha?"} className="self-end text-sm" />
				<InputPasswordField id="password" />
			</div>

			<CheckboxField id={"checkbox"} name={"remember_me"} />

			{/* botão de logar */}
			<Button.Root className="bg-teal-600 hover:bg-teal-500" type="submit">
				<Button.Content text="Entrar" className="text-white" />
			</Button.Root>

			<TraceText text="ou entrar com" className="my-2" />

			{/* botão de logar com o google */}
			<Button.Root className="mb-4">
				<Button.Icon
					icon={
						<Image src={"/svg/icon-google.svg"} alt={"logo"} width={24} height={24} />
					}
				/>
				<Button.Content text="Continuar com Google" />
			</Button.Root>

			<TextLink text={"Criar uma conta"} className="self-center" />
		</form>
	);
}

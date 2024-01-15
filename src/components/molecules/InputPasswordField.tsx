"use client";

import { ComponentProps, useState } from "react";
import Input from "../atoms/input";

interface Props extends ComponentProps<"div"> {
	id: string;
	name?: string;
	label?: string;
	defaultValue?: string;
}

export default function InputPasswordField({
	id,
	name,
	label = "Senha",
	defaultValue = "",
}: Props) {
	const [input, setInput] = useState<string>(defaultValue);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	return (
		<Input.Root>
			<Input.LabelToTop ltToggle={input.length > 0} label={label} htmlFor={id} />

			<Input.PasswordIcon
				showPassword={showPassword}
				action={() => setShowPassword((prev) => !prev)}
			/>

			<Input.Body
				id={id}
				name={name}
				type={showPassword ? "text" : "password"}
				onChange={(e) => setInput(e.target.value)}
				className="pr-10"
			/>
		</Input.Root>
	);
}

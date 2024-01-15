"use client";

import { ComponentProps, useState } from "react";
import InputRoot from "../atoms/input/InputRoot";
import InputLabelToTop from "../atoms/input/InputLabelToTop";
import InputPasswordIcon from "../atoms/input/InputPasswordIcon";
import InputBody from "../atoms/input/InputBody";

interface Props extends ComponentProps<"div"> {
	id: string;
	name?: string;
	defaultValue?: string;
}

export default function InputPasswordField({
	id,
	name,
	defaultValue = "",
}: Props) {
	const [input, setInput] = useState<string>(defaultValue);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	return (
		<InputRoot>
			<InputLabelToTop ltToggle={input.length > 0} label="Senha" htmlFor={id} />

			<InputPasswordIcon
				showPassword={showPassword}
				action={() => setShowPassword((prev) => !prev)}
			/>

			<InputBody
				id={id}
				name={name}
				type={showPassword ? "text" : "password"}
				onChange={(e) => setInput(e.target.value)}
			/>
		</InputRoot>
	);
}

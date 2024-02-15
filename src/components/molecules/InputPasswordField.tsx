"use client";

import { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";
import Input from "../atoms/input";

interface Props extends ComponentProps<"div"> {
	id: string;
	name?: string;
	label?: string;
	defaultValue?: string;
	invalid?: boolean;
}

export default function InputPasswordField({
	id,
	name,
	label = "Senha",
	invalid = false,
	defaultValue = "",
	className,
}: Props) {
	const [input, setInput] = useState<string>(defaultValue);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	return (
		<Input.Root>
			<Input.LabelToTop
				ltToggle={input.length > 0}
				label={label}
				htmlFor={id}
				invalid={invalid}
			/>

			<Input.PasswordIcon
				showPassword={showPassword}
				action={() => setShowPassword((prev) => !prev)}
			/>

			<Input.Body
				id={id}
				name={name}
				type={showPassword ? "text" : "password"}
				invalid={invalid}
				onChange={(e) => setInput(e.target.value)}
				className={twMerge("pr-10", className)}
				required
			/>
		</Input.Root>
	);
}

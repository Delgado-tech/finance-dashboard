"use client";

import { ComponentProps, useState } from "react";
import Input from "../atoms/input";

interface Props extends ComponentProps<"input"> {
	id: string;
	name?: string;
	label?: string;
	defaultValue?: string;
}

export default function InputField({
	id,
	name,
	type = "text",
	label = id,
	defaultValue = "",
}: Props) {
	const [input, setInput] = useState<string>(defaultValue);

	return (
		<Input.Root>
			<Input.LabelToTop ltToggle={input.length > 0} label={label} htmlFor={id} />

			<Input.Body
				id={id}
				name={name}
				type={type}
				onChange={(e) => setInput(e.target.value)}
			/>
		</Input.Root>
	);
}

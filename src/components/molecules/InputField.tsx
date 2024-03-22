"use client";

import { RegexFunctionType } from "@/utils/regex";
import { ComponentProps, useEffect, useState } from "react";
import Input from "../atoms/input";

interface Props extends ComponentProps<"input"> {
	id: string;
	name?: string;
	label?: string;
	labelColor?: string;
	defaultValue?: string;
	regexFC?: RegexFunctionType;
	invalid?: boolean;
}

export default function InputField({
	id,
	name,
	type = "text",
	label = id,
	labelColor,
	defaultValue = "",
	regexFC = (value: string) => value,
	minLength,
	disabled,
	placeholder,
	invalid = false,
	required = false,
}: Props) {
	const [input, setInput] = useState<string>(defaultValue);

	useEffect(() => {
		setInput(defaultValue);
	}, [defaultValue]);

	return (
		<Input.Root>
			{!placeholder && (
				<Input.LabelToTop
					ltToggle={input.length > 0}
					label={label}
					htmlFor={id}
					invalid={invalid}
					labelColor={labelColor}
				/>
			)}

			<Input.Body
				id={id}
				name={name}
				type={type}
				placeholder={placeholder}
				onChange={(e) => setInput(regexFC(e.target.value))}
				value={input}
				minLength={minLength}
				invalid={invalid}
				disabled={disabled}
				required={required}
			/>
		</Input.Root>
	);
}

"use client";

import { RegexFunctionType } from "@/utils/regex";
import { ComponentProps, useState } from "react";
import Input from "../atoms/input";

interface Props extends ComponentProps<"textarea"> {
	id: string;
	name?: string;
	label?: string;
	labelColor?: string;
	defaultValue?: string;
	regexFC?: RegexFunctionType;
	invalid?: boolean;
}

export default function TextareaField({
	id,
	name,
	label = id,
	labelColor,
	defaultValue = "",
	regexFC = (value: string) => value,
	minLength,
	maxLength,
	rows,
	placeholder,
	invalid = false,
	required = false,
}: Props) {
	const [input, setInput] = useState<string>(defaultValue);

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

			<Input.TextareaBody
				id={id}
				name={name}
				placeholder={placeholder}
				onChange={(e) => setInput(regexFC(e.target.value))}
				value={input}
				rows={rows}
				minLength={minLength}
				maxLength={maxLength}
				invalid={invalid}
				required={required}
			/>
		</Input.Root>
	);
}

"use client";

import { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";
import Input from "../atoms/input";

interface Props extends ComponentProps<"input"> {
	id: string;
	icon: React.ReactNode;
	iconAction?: React.MouseEventHandler;
	name?: string;
	label?: string;
	defaultValue?: string;
	invalid?: boolean;
}

export default function InputFieldIcon({
	id,
	icon,
	iconAction,
	name,
	value,
	type = "text",
	label = id,
	placeholder,
	defaultValue = "",
	className,
	onKeyDown = () => {},
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
				/>
			)}

			<Input.Icon icon={icon} action={iconAction} />

			<Input.Body
				id={id}
				name={name}
				type={type}
				value={value}
				className={twMerge("pr-10", className)}
				placeholder={placeholder}
				onChange={(e) => setInput(e.target.value)}
				onKeyDown={onKeyDown}
				invalid={invalid}
				required={required}
			/>
		</Input.Root>
	);
}

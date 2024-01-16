"use client";

import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import Checkbox from "../atoms/Checkbox";

interface Props extends ComponentProps<"div"> {
	id: string;
	name?: string;
	defaultChecked?: boolean;
}

export default function CheckboxField({
	id,
	name = id,
	className,
	defaultChecked = false,
}: Props) {
	return (
		<div className={twMerge("flex items-center gap-2", className)}>
			<Checkbox id={id} name={name} defaultChecked={defaultChecked} />
			<label
				htmlFor={id}
				className="cursor-pointer select-none text-sm sm:text-base"
			>
				Manter-se logado
			</label>
		</div>
	);
}

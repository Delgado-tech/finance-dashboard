"use client";

import { twMerge } from "tailwind-merge";
import Checkbox from "../atoms/checkbox";
import { useState } from "react";

interface Props {
	id: string;
	name: string;
	className?: string;
	defaultChecked?: boolean;
}

export default function CheckboxField({
	id,
	name,
	className,
	defaultChecked = false,
}: Props) {
	return (
		<div className={twMerge("flex gap-2 items-center", className)}>
			<Checkbox id={id} name={name} defaultChecked={defaultChecked} />
			<label htmlFor={id} className="cursor-pointer select-none">
				Manter-se logado
			</label>
		</div>
	);
}

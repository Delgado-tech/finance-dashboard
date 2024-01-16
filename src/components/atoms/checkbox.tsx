"use client";

import { Check } from "lucide-react";
import { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"input"> {
	id: string;
	name: string;
	defaultChecked?: boolean;
}

export default function Checkbox({
	id,
	name,
	className,
	defaultChecked = false,
}: Props) {
	const [checked, setChecked] = useState<boolean>(defaultChecked);

	return (
		<>
			<input
				id={id}
				name={name}
				type="checkbox"
				className="hidden"
				onChange={(event) => {
					const current = event.target.checked;
					if (checked !== current) setChecked(event.target.checked);
				}}
				checked={checked}
			/>
			<span
				data-checked={checked}
				className={twMerge(
					"flex size-4 cursor-pointer select-none items-center justify-center rounded text-sm text-white data-[checked=false]:border data-[checked=false]:border-zinc-400 data-[checked=true]:bg-teal-600 md:size-6",
					className,
				)}
				onClick={() => setChecked((prev) => !prev)}
			>
				{checked && <Check className="size-3" />}
			</span>
		</>
	);
}

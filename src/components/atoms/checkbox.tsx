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
					"data-[checked=false]:border-zinc-400 data-[checked=false]:border select-none rounded p-1 text-sm h-6 w-6 text-white cursor-pointer data-[checked=true]:bg-teal-600",
					className
				)}
				onClick={() => setChecked((prev) => !prev)}
			>
				{checked && <Check size={16} />}
			</span>
		</>
	);
}

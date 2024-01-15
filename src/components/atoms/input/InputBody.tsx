import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"input"> {
	id: string;
}

export default function InputBody({
	id,
	name = id,
	type,
	value,
	onChange,
	className,
}: Props) {
	return (
		<input
			id={id}
			name={name}
			type={type}
			value={value}
			onChange={onChange}
			className={twMerge(
				"outline-none rounded-lg pl-4 pr-10 py-3 border text-zinc-600 border-zinc-400 focus:border-teal-600 bg-transparent w-full",
				className
			)}
		/>
	);
}

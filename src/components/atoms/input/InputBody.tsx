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
				"w-full rounded-lg border border-zinc-400 bg-transparent px-4 py-3 text-zinc-600 outline-none focus:border-teal-600",
				className,
			)}
		/>
	);
}

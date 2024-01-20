import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"input"> {
	id: string;
	invalid?: boolean;
}

export default function InputBody({
	id,
	name = id,
	invalid = false,
	type,
	value,
	onChange,
	className,
	required,
}: Props) {
	return (
		<input
			id={id}
			name={name}
			type={type}
			value={value}
			onChange={onChange}
			data-invalid={invalid}
			className={twMerge(
				`w-full rounded-lg border border-zinc-400 bg-transparent px-4 py-3 text-zinc-600 outline-none 
				transition-colors focus:border-teal-600 
				data-[invalid=true]:border-red-400 data-[invalid=true]:focus:border-red-500`,
				className,
			)}
			required={required}
		/>
	);
}

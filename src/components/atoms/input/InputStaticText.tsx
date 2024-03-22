import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"input"> {
	id: string;
	invalid?: boolean;
	isFocus?: boolean;
}

export default function InputStaticText({
	id,
	name = id,
	invalid = false,
	isFocus = false,
	value,
	disabled,
	onChange,
	className,
}: Props) {
	return (
		<div
			data-disabled={disabled}
			data-invalid={invalid}
			data-focus={isFocus}
			className={twMerge(
				`min-h-[50px] w-full rounded-lg border border-zinc-400 bg-transparent px-4 py-3 text-zinc-600
					transition-colors data-[focus=true]:border-teal-600
					data-[invalid=true]:border-red-400
					data-[disabled=true]:bg-zinc-100 data-[invalid=true]:focus:border-red-500`,
				className,
			)}
		>
			<span>{value}</span>
			<input
				id={id}
				name={name}
				type={"hidden"}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}

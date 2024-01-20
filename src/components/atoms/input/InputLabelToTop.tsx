import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"span"> {
	label?: string;
	htmlFor?: string;
	ltToggle?: boolean;
	invalid?: boolean;
}

export default function InputLabelToTop({
	className,
	label = "label",
	htmlFor = "",
	ltToggle = false,
	invalid = false,
}: Props) {
	return (
		<span
			data-label-top={ltToggle}
			data-invalid={invalid}
			className={twMerge(
				`absolute left-[9px] translate-y-[13px] cursor-text rounded-lg px-2 text-zinc-500 transition-all
					data-[label-top=true]:-translate-y-1/2 data-[label-top=true]:bg-zinc-100 
					data-[label-top=true]:text-sm data-[invalid=true]:text-red-600`,
				className,
			)}
		>
			<label
				className="cursor-text select-none text-sm font-medium sm:text-base"
				htmlFor={htmlFor}
			>
				{label}
			</label>
		</span>
	);
}

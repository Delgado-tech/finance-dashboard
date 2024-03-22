import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"span"> {
	label?: string;
	htmlFor?: string;
	ltToggle?: boolean;
	labelColor?: string;
	isFocus?: boolean;
	invalid?: boolean;
}

export default function InputLabelToTop({
	className,
	label = "label",
	htmlFor = "",
	isFocus = false,
	ltToggle = false,
	labelColor = "bg-zinc-100",
	invalid = false,
}: Props) {
	return (
		<span
			data-label-top={ltToggle}
			data-invalid={invalid}
			data-focus={isFocus}
			className={twMerge(
				`group/label absolute left-[9px] z-50 translate-y-[13px] cursor-default rounded-lg px-2
					text-zinc-500 transition-all data-[label-top=true]:-translate-y-1/2
					data-[label-top=true]:text-sm data-[focus=true]:text-teal-600 data-[invalid=true]:text-red-600`,
				className,
			)}
		>
			<span
				className={`absolute left-0 top-[calc(50%)] -z-10 h-[1px] w-full ${labelColor} group-data-[label-top=false]/label:bg-transparent`}
			></span>
			<label
				className="z-20 cursor-text select-none text-sm font-medium sm:text-base"
				htmlFor={htmlFor}
			>
				{label}
			</label>
		</span>
	);
}

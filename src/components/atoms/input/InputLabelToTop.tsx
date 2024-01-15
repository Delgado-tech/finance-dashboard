import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"span"> {
	label?: string;
	htmlFor?: string;
	ltToggle?: boolean;
}

export default function InputLabelToTop({
	className,
	label = "label",
	htmlFor = "",
	ltToggle = false,
}: Props) {
	return (
		<span
			data-label-top={ltToggle}
			className={twMerge(
				`absolute rounded-lg translate-y-[13px] px-2 left-[9px] cursor-pointer text-zinc-500 transition-all
					data-[label-top=true]:bg-zinc-100 data-[label-top=true]:-translate-y-1/2 
					data-[label-top=true]:text-sm`,
				className
			)}
		>
			<label className="font-medium" htmlFor={htmlFor}>
				{label}
			</label>
		</span>
	);
}

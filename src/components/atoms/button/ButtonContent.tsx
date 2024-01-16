import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"span"> {
	text?: string;
	children?: React.ReactNode;
}

export default function ButtonContent({ text, className, children }: Props) {
	return (
		<span className={twMerge("text-sm text-zinc-600 md:text-base", className)}>
			{text}
			{children}
		</span>
	);
}

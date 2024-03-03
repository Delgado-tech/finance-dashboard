import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"h3"> {
	text: string;
}

export default function Title({ text, className }: Props) {
	return (
		<h3 className={twMerge("my-4 text-xl text-zinc-500", className)}>{text}</h3>
	);
}

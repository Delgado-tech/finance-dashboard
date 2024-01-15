import Link from "next/link";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"a"> {
	text?: string;
}

export default function TextLink({ text, href = "#", className }: Props) {
	return (
		<Link
			href={href}
			className={twMerge(
				"font-medium text-teal-600 hover:text-teal-500 transition-colors",
				className
			)}
		>
			{text}
		</Link>
	);
}

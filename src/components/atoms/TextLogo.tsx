import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"h1"> {}

export default function TextLogo({ className }: Props) {
	return (
		<h1
			className={twMerge(
				"font-poppins text-5xl text-teal-600 mb-16 text-center",
				className
			)}
		>
			<span className="font-extrabold">FINE</span>bank.
			<span className="font-extrabold">IO</span>
		</h1>
	);
}

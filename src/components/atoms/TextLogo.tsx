import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"h1"> {}

export default function TextLogo({ className }: Props) {
	return (
		<h1
			className={twMerge(
				"text-center font-poppins text-3xl text-teal-600 sm:text-4xl md:text-5xl",
				className,
			)}
		>
			<span className="font-extrabold">FINE</span>bank.
			<span className="font-extrabold">IO</span>
		</h1>
	);
}

import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"h1"> {
	noPreResponsivity?: boolean;
}

export default function TextLogo({
	className,
	noPreResponsivity = false,
}: Props) {
	return (
		<h1
			data-no-pre-responsivity={noPreResponsivity}
			className={twMerge(
				"text-center font-poppins text-3xl text-teal-600 data-[noo-pre-responsivity=false]:sm:text-4xl data-[noo-pre-responsivity=false]:md:text-5xl",
				className,
			)}
			translate="no"
		>
			<span className="font-extrabold">FINE</span>bank.
			<span className="font-extrabold">IO</span>
		</h1>
	);
}

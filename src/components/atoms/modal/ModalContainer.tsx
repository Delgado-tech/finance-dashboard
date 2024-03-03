import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {}

export default function ModalContainer({ children, className }: Props) {
	return (
		<div
			className={twMerge(
				"m-4 h-fit min-h-[500px] w-[clamp(200px,_100%,_500px)] rounded-lg bg-white p-4",
				className,
			)}
		>
			{children}
		</div>
	);
}

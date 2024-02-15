import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"span"> {
	icon: React.ReactNode;
	action?: React.MouseEventHandler;
}

export default function InputIcon({
	className,
	icon,
	action = () => {},
}: Props) {
	return (
		<span
			className={twMerge(
				"absolute right-3 top-1/2 m-auto -translate-y-1/2 cursor-pointer select-none text-zinc-500",
				className,
			)}
			onClick={action}
		>
			{icon}
		</span>
	);
}

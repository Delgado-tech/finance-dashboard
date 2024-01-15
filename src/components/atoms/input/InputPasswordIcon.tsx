import { Eye, EyeOff, Link } from "lucide-react";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"span"> {
	showPassword: boolean;
	action: Function;
}

export default function InputPasswordIcon({
	className,
	showPassword,
	action,
}: Props) {
	return (
		<span
			className={twMerge(
				"absolute m-auto top-1/2 -translate-y-1/2 right-3 cursor-pointer text-zinc-500 select-none",
				className
			)}
			onClick={() => {
				action();
			}}
		>
			{showPassword ? <EyeOff /> : <Eye />}
		</span>
	);
}

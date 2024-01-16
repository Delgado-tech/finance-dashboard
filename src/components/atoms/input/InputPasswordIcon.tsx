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
				"absolute right-3 top-1/2 m-auto -translate-y-1/2 cursor-pointer select-none text-zinc-500",
				className,
			)}
			onClick={() => {
				action();
			}}
		>
			{showPassword ? <EyeOff /> : <Eye />}
		</span>
	);
}

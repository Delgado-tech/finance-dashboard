import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {
	defaultValue?: string;
}

export default function InputRoot({ children, className }: Props) {
	return <div className={twMerge("relative", className)}>{children}</div>;
}

import { Eye, EyeOff } from "lucide-react";
import { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";
import InputPasswordIcon from "./InputPasswordIcon";
import InputLabelToTop from "./InputLabelToTop";
import InputBody from "./InputBody";

interface Props extends ComponentProps<"div"> {
	defaultValue?: string;
}

export default function InputRoot({ children }: Props) {
	return <div className="relative">{children}</div>;
}

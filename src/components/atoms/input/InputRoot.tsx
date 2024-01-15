import { Eye, EyeOff, Link } from "lucide-react";
import { ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"input"> {
	defaultValue?: string;
}

export default function InputRoot({ className, defaultValue = "" }: Props) {
	const [input, setInput] = useState<string>(defaultValue);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	return (
		<div className="relative">
			<span
				data-label-top={input.length > 0}
				className="absolute rounded-lg translate-y-[13px] px-2 left-[9px] cursor-pointer text-zinc-500 transition-all
					data-[label-top=true]:bg-zinc-100 data-[label-top=true]:-translate-y-1/2 
					data-[label-top=true]:text-sm "
			>
				<label className="font-medium" htmlFor="password">
					Senha
				</label>
			</span>

			<span
				className="absolute m-auto top-1/2 -translate-y-1/2 right-3 cursor-pointer text-zinc-500 select-none"
				onClick={() => setShowPassword((prev) => !prev)}
			>
				{showPassword ? <EyeOff /> : <Eye />}
			</span>

			<input
				id="password"
				name="password"
				type={showPassword ? "text" : "password"}
				value={input}
				onChange={(e) => setInput(e.target.value)}
				className="outline-none rounded-lg pl-4 pr-10 py-3 border text-zinc-600 border-zinc-400 focus:border-teal-600 bg-transparent w-full"
			/>
		</div>
	);
}

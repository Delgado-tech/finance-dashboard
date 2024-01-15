import { Eye, Link } from "lucide-react";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"input"> {}

export default function InputIcon({ className }: Props) {
	return (
		<div className="relative">
			<span className="absolute rounded-lg bg-zinc-100 -translate-y-1/2 px-2 left-2 cursor-pointer text-zinc-500">
				<label className="font-medium" htmlFor="password">
					Senha
				</label>
			</span>

			<span className="absolute m-auto top-1/2 -translate-y-1/2 right-3 cursor-pointer text-zinc-500">
				<Eye />
				{/* <EyeOff /> */}
			</span>

			<input
				id="password"
				type="password"
				name="password"
				className="outline-none rounded-lg pl-4 pr-10 py-3 border text-zinc-600 border-zinc-400 focus:border-teal-600 bg-transparent w-full"
			/>
		</div>
	);
}

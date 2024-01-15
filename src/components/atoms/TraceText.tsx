import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"span"> {
	text: string;
	traceColor?: string;
}

export default function TraceText({ text, traceColor, className }: Props) {
	return (
		<span className="relative flex items-center justify-center">
			<span
				className={twMerge("text-zinc-400 text-sm bg-zinc-100 px-2", className)}
			>
				{text}
			</span>
			<span
				className={twMerge(
					"absolute bg-zinc-300 w-[calc(100%-2rem)] h-[1px] left-4 -z-10",
					traceColor
				)}
			/>
		</span>
	);
}

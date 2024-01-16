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
				className={twMerge("bg-zinc-100 px-2 text-sm text-zinc-400", className)}
			>
				{text}
			</span>
			<span
				className={twMerge(
					"absolute left-4 -z-10 h-[1px] w-[calc(100%-2rem)] bg-zinc-300",
					traceColor,
				)}
			/>
		</span>
	);
}

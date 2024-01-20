import Link from "next/link";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"button"> {
	link?: string;
}

export default function ButtonRoot({ link, className, children }: Props) {
	const button = (
		<button
			className={twMerge(
				"flex w-full items-center justify-center gap-4 rounded-lg bg-zinc-200 py-3 transition-all hover:scale-[101%] hover:bg-zinc-300 hover:shadow-md",
				className,
			)}
		>
			{children}
		</button>
	);

	return <>{link ? <Link href={""}>{button}</Link> : <>{button}</>}</>;
}

import Link from "next/link";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"button"> {
	link?: string;
	children: React.ReactNode;
}

export default function ButtonRoot({ link, className, children }: Props) {
	const button = (
		<button
			className={twMerge(
				"bg-zinc-200 flex items-center justify-center gap-4 rounded-lg py-3 hover:bg-zinc-300 hover:scale-[101%] hover:shadow-md transition-all w-full mb-4",
				className
			)}
		>
			{children}
		</button>
	);

	return <>{link ? <Link href={""}>{button}</Link> : <>{button}</>}</>;
}

import Link from "next/link";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"button"> {
	defaultEffects?: boolean;
	alternativeStyle?: boolean;
	link?: string;
}

export default function ButtonRoot({
	link,
	className,
	defaultEffects = true,
	alternativeStyle = false,
	children,
}: Props) {
	const button = (
		<button
			data-default-effects={defaultEffects}
			data-alternative-style={alternativeStyle}
			className={twMerge(
				`flex w-full items-center justify-center gap-4 rounded-lg bg-zinc-200 py-3 transition-all 
				hover:bg-zinc-300 
				data-[default-effects=true]:hover:scale-[101%] 
				data-[default-effects=true]:hover:shadow-md`,
				className,
			)}
		>
			{children}
		</button>
	);

	return <>{link ? <Link href={link}>{button}</Link> : <>{button}</>}</>;
}

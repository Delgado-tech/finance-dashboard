import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"span"> {
	icons: {
		first: React.ReactNode;
		second: React.ReactNode;
	};
	changeIcon: boolean;
	action?: Function;
}

export default function InputIconChanger({
	icons,
	className,
	changeIcon,
	action = () => {},
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
			{changeIcon ? icons.first : icons.second}
		</span>
	);
}

import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../atoms/button";

export interface Props extends ComponentProps<"div"> {
	text?: string;
	icon?: React.ReactNode;
	link?: string;
	selected?: boolean;
}

export default function SidebarLink({
	text,
	icon,
	link,
	selected = false,
	className,
}: Props) {
	return (
		<div>
			<Button.Root
				className={twMerge(
					`group justify-start border border-transparent bg-transparent px-4 hover:border-teal-600
                            hover:bg-transparent data-[alternative-style=true]:bg-teal-600`,
					className,
				)}
				alternativeStyle={selected}
				defaultEffects={false}
				link={link}
			>
				<Button.Icon
					icon={icon}
					className="text-zinc-50 group-data-[alternative-style=false]:group-hover:text-teal-600"
				/>
				<Button.Content
					text={text}
					className="text-zinc-50 group-data-[alternative-style=false]:group-hover:text-teal-600"
				/>
			</Button.Root>
		</div>
	);
}

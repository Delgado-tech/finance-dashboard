"use client";

import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {
	username: string;
	hideText?: boolean;
}

export default function SidebarProfile({
	username,
	className,
	hideText = false,
}: Props) {
	return (
		<div
			data-shrink={hideText}
			className={twMerge(
				"group flex items-center gap-4 border-t border-zinc-700 py-8 data-[shrink=true]:justify-center",
				className,
			)}
		>
			<figure className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-teal-600">
				<span>{username.charAt(0)}</span>
			</figure>
			{!hideText && (
				<div>
					<p
						className="max-w-48 cursor-pointer truncate font-medium"
						title={username}
					>
						{username}
					</p>
					<span className="block cursor-pointer bg-transparent text-sm text-zinc-400 group-hover:text-zinc-100 group-hover:underline">
						Ver perfil
					</span>
				</div>
			)}
		</div>
	);
}

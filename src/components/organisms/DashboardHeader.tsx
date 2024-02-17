"use client";

import dFormat from "dateformat";
import { ChevronsRight } from "lucide-react";
import { usePathname } from "next/navigation";
import SearchInput from "../molecules/SearchInput";

interface Props {
	username?: string;
}

export default function DashboardHeader({ username }: Props) {
	const currentDate = dFormat(new Date(), "mmm dd, yyyy");

	const pathname = usePathname();
	if (!pathname.includes("dashboard/overview")) {
		username = undefined;
	}

	return (
		<header className="sticky top-0 z-50 flex items-center justify-between gap-8 border border-b-zinc-300 bg-zinc-100 bg-opacity-90 p-8">
			<div className="flex items-center gap-1 text-zinc-400">
				{username && (
					<span className="font-poppins text-xl font-bold uppercase text-zinc-600">
						olá {username}
					</span>
				)}
				<ChevronsRight />
				<span>{currentDate}</span>
			</div>
			<div className="w-full max-w-96">
				<SearchInput />
			</div>
		</header>
	);
}

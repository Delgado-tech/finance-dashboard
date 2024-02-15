"use client";

import { IDictionary } from "@/types/dictionary";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

interface Props {
	tabList: IDictionary<string, string>[];
	currentTab: string;
}

export default function TabList({ tabList, currentTab }: Props) {
	/* Configuração da Query da URL de redirecionamento */
	const searchParams = new URLSearchParams(useSearchParams());
	searchParams.delete("t");

	const prevParams = searchParams.toString() ? `&${searchParams}` : "";

	/* UseRefs */
	const tabDivRef = useRef<HTMLDivElement>(null);

	const tabUnderlineHandler = (tab: HTMLElement) => {
		const underline = tabDivRef.current!.children[0] as HTMLElement;

		underline.style.width = `${tab.offsetWidth}px`;
		underline.style.translate = `${tab.offsetLeft}px 0px`;
	};

	useEffect(() => {
		const tabDiv = tabDivRef.current;

		if (tabDiv) {
			const target = tabDiv.querySelector(`#${currentTab}`) as HTMLElement;
			tabUnderlineHandler(target);
		}
	}, []);

	return (
		<div
			ref={tabDivRef}
			className="relative flex w-fit gap-4 font-bold text-zinc-600 [&>:nth-child(n+2)]:p-4"
		>
			<span className="absolute bottom-0 left-0 h-[2px] w-20 bg-teal-600 transition-all" />
			{tabList.map((tab, index) => {
				const isCurrentView = tab.key === currentTab;

				return (
					<Link
						key={index}
						id={tab.key}
						href={`?t=${tab.key}${prevParams}`}
						data-selected={isCurrentView}
						onClick={(event) => tabUnderlineHandler(event.target as HTMLElement)}
						className="relative cursor-pointer select-none transition-all data-[selected=true]:text-teal-600"
					>
						{tab.value}
					</Link>
				);
			})}
		</div>
	);
}

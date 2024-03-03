import { ITable } from "@/types/table";
import { ComponentProps, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ITable, ComponentProps<"div"> {
	onRowClick?: (rowId: string) => void;
}

export default function Table({
	header = [],
	rows = [],
	onRowClick,
	noResultsMessage = "Nenhum resultado encontrado!",
	className,
}: Props) {
	const loadInterval = 10;
	const [loaded, setLoaded] = useState<number>(loadInterval);
	const loadedRows = rows.slice(0, loaded);

	const loadWhenScrollEnd = () => {
		const isScrollEnd =
			window.scrollY + window.innerHeight >= document.body.offsetHeight - 10;

		if (isScrollEnd) {
			if (loaded < rows.length) {
				setLoaded(loaded + loadInterval);
			}
		}
	};

	useEffect(() => {
		const scrollHandler = () => {
			loadWhenScrollEnd();
		};

		window.addEventListener("scroll", scrollHandler);

		return () => window.removeEventListener("scroll", scrollHandler);
	}, [loaded]);

	useEffect(() => {
		if (window.scrollY === 0) {
			loadWhenScrollEnd();
		}
	});

	return (
		<section
			className={twMerge("rounded-lg bg-white px-4 py-4 shadow-sm", className)}
		>
			<table
				className="group w-full border-collapse"
				data-row-interactive={onRowClick !== undefined}
			>
				{header.length > 0 && (
					<thead className="[&_th]:px-2 [&_th]:py-4 [&_th]:text-zinc-700">
						<tr className="border-b border-b-zinc-200 text-center first:[&_th]:text-start last:[&_th]:text-end">
							{header.map((th, index) => (
								<th key={index}>{th}</th>
							))}
						</tr>
					</thead>
				)}
				<tbody className="[&_td]:px-2 [&_td]:py-6 [&_td]:text-zinc-600 last:[&_tr]:border-0">
					{loadedRows.map((row, index) => {
						return (
							<tr
								key={index}
								className="border-b border-b-zinc-200 text-center 
									group-data-[row-interactive=true]:cursor-pointer 
									group-data-[row-interactive=true]:transition-all 
									group-data-[row-interactive=true]:hover:-translate-y-[1px] 
									group-data-[row-interactive=true]:hover:scale-[101.5%] 
									group-data-[row-interactive=true]:hover:bg-zinc-100
                                    first:[&_td]:text-start first:[&_td]:font-bold
                                    last:[&_td]:text-end last:[&_td]:font-bold"
								onClick={() => {
									if (onRowClick) onRowClick(row.id);
								}}
							>
								{row.columns?.map((td, index) => <td key={index}>{td}</td>)}
							</tr>
						);
					})}
				</tbody>
			</table>
			{rows.length === 0 && (
				<p className="px-2 py-6 text-zinc-600">{noResultsMessage}</p>
			)}
		</section>
	);
}

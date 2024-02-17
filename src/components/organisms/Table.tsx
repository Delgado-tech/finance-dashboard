import { ITable } from "@/types/table";
import { useEffect, useState } from "react";

interface Props extends ITable {}

export default function Table({
	header = [],
	rows = [],
	noResultsMessage = "Nenhum resultado encontrado!",
}: Props) {
	const loadInterval = 2;
	const [loaded, setLoaded] = useState<number>(loadInterval);
	const loadedRows = rows.slice(0, loaded);

	useEffect(() => {
		const loadWhenScrollEnd = () => {
			const isScrollEnd =
				window.scrollY + window.innerHeight >= document.body.offsetHeight - 10;
			if (isScrollEnd) {
				if (loaded < rows.length) {
					setLoaded(loaded + loadInterval);
				}
			}
		};

		const scrollHandler = () => {
			loadWhenScrollEnd();
		};

		window.addEventListener("scroll", scrollHandler);

		if (window.scrollY === 0) {
			loadWhenScrollEnd();
		}

		return () => window.removeEventListener("scroll", scrollHandler);
	}, [loaded]);

	return (
		<section className="my-4 rounded-lg bg-white px-4 shadow-sm">
			<table className="w-full border-collapse">
				{header && (
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
                                    first:[&_td]:text-start first:[&_td]:font-bold
                                    last:[&_td]:text-end last:[&_td]:font-bold"
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

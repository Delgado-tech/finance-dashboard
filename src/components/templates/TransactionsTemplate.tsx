"use client";

import { IDictionary } from "@/types/dictionary";
import { IRows } from "@/types/table";
import dFormat from "dateformat";
import { ArrowBigDown, ArrowBigUp, ChevronsRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import SearchInput from "../molecules/SearchInput";
import TabList from "../molecules/TabList";
import Table from "../organisms/Table";

const typeViews = ["all", "revenue", "expenses"];
type Views = (typeof typeViews)[number];

export default function TransactionsTemplate() {
	const currentDate = dFormat(new Date(), "mmm dd, yyyy");

	//#region  Configuração dos parâmetros de pesquisa
	const searchParams = new URLSearchParams(useSearchParams());

	const currentView = typeViews.includes(searchParams.get("t") || "")
		? searchParams.get("t")!
		: "all";

	const search = searchParams.get("q");
	//#endregion

	const views: IDictionary<Views, string>[] = [
		{ key: "all", value: "Todos" },
		{ key: "revenue", value: "Receitas" },
		{ key: "expenses", value: "Despesas" },
	];

	//#region mockup
	const mockup = [
		{
			item: "Sushi",
			desc: "Naomi",
			data: new Date(),
			met: "Cartão de crédito",
			valor: "3000",
			type: "expenses",
		},
		{
			item: "Pagamento",
			desc: undefined,
			data: new Date("2023-11-01"),
			met: "Cartão de crédito",
			valor: "30000",
			type: "revenue",
		},
		{
			item: "Taco de baseball",
			desc: "Dacathlon",
			data: new Date("2022-10-02"),
			met: "PIX",
			valor: "30000",
			type: "expenses",
		},
		{
			item: "Taco de baseball",
			desc: "Dacathlon",
			data: new Date("2022-10-02"),
			met: "PIX",
			valor: "30000",
			type: "expenses",
		},
		{
			item: "Taco de baseball",
			desc: "Dacathlon",
			data: new Date("2022-10-02"),
			met: "PIX",
			valor: "30000",
			type: "expenses",
		},
		{
			item: "Taco de baseball",
			desc: "Dacathlon",
			data: new Date("2022-10-02"),
			met: "PIX",
			valor: "30000",
			type: "expenses",
		},
		{
			item: "Taco de baseball",
			desc: "Dacathlon",
			data: new Date("2022-10-02"),
			met: "PIX",
			valor: "30000",
			type: "expenses",
		},
		{
			item: "Taco de baseball",
			desc: "Dacathlon",
			data: new Date("2022-10-02"),
			met: "PIX",
			valor: "30000",
			type: "expenses",
		},
		{
			item: "Taco de baseball",
			desc: "Dacathlon",
			data: new Date("2022-10-02"),
			met: "PIX",
			valor: "30000",
			type: "expenses",
		},
		{
			item: "Taco de baseball",
			desc: "Dacathlon",
			data: new Date("2022-10-02"),
			met: "PIX",
			valor: "30000",
			type: "expenses",
		},
		{
			item: "Taco de baseball 2",
			desc: "Dacathlon",
			data: new Date("2022-10-02"),
			met: "PIX",
			valor: "30000",
			type: "expenses",
		},
	];

	const mockupFiltered = mockup
		.filter((item) => {
			if (item.type !== currentView && currentView !== "all") return;
			if (!item.item.toLowerCase().startsWith(search?.toString().trim() || ""))
				return;

			return item;
		})
		.sort((a, b) => Number(a.data) + Number(b.data));
	//#endregion

	const header = ["Itens", "Descrição", "Data", "Método de Pagamento", "Valor"];

	const rows: IRows[] = mockupFiltered.map((item) => {
		const columns: any = [
			<>{item.item}</>,
			<>{item.desc || "---"}</>,
			<>{dFormat(item.data, "mmm dd, yyyy")}</>,
			<>{item.met}</>,
			<span
				data-type={item.type}
				className="flex justify-end data-[type=revenue]:text-emerald-500"
			>
				{item.type === "revenue" ? (
					<ArrowBigUp />
				) : (
					<ArrowBigDown className="text-zinc-400" />
				)}

				{(Number(item.valor) / 100).toLocaleString("pt-BR", {
					style: "currency",
					currency: "BRL",
				})}
			</span>,
		];
		return { columns: columns };
	});

	return (
		<section>
			{/** header */}
			<header className="flex items-center justify-between gap-8 border border-b-zinc-300 p-8">
				<div className="flex items-center gap-1 text-zinc-400">
					<ChevronsRight />
					<span>{currentDate}</span>
				</div>
				<div className="w-full max-w-96">
					<SearchInput />
				</div>
			</header>

			<main className="p-8">
				<h3 className="mb-4 text-xl text-zinc-500">Transações Recentes</h3>
				<div>
					<TabList tabList={views} currentTab={currentView} />
					<Table
						header={header}
						rows={rows}
						noResultsMessage="Nenhuma transação encontrada!"
					/>
				</div>
			</main>
		</section>
	);
}

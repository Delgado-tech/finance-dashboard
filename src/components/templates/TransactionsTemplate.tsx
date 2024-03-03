"use client";

import { useModalContext } from "@/context/ModalContext";
import { transactions } from "@/mock/transactions.mockup";
import { IDictionary } from "@/types/dictionary";
import { IRows } from "@/types/table";
import dFormat from "dateformat";
import { ArrowBigDown, ArrowBigUp, Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import DynamicIcon from "../atoms/DynamicIcon";
import Title from "../atoms/Title";
import TabList from "../molecules/TabList";
import Table from "../organisms/Table";
import ModalTransactionEdit from "../organisms/modal/modalTransaction/ModalTransactionEdit";
import ModalTransactionRegister from "../organisms/modal/modalTransaction/ModalTransactionRegister";

const typeViews = ["all", "revenue", "expenses"];
type Views = (typeof typeViews)[number];

export default function TransactionsTemplate() {
	const modalContext = useModalContext();

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
	const filteredTransactions = transactions
		.filter((item) => {
			if (item.type !== currentView && currentView !== "all") return;
			if (!item.item?.toLowerCase().startsWith(search?.toString().trim() || ""))
				return;

			return item;
		})
		.sort((a, b) => Number(a.date) + Number(b.date));
	//#endregion

	const header = ["Itens", "Descrição", "Data", "Método de Pagamento", "Valor"];

	const rows: IRows[] = filteredTransactions.map((item) => {
		const columns: any = [
			<span className="flex items-center justify-start gap-2">
				<DynamicIcon iconName={item.categoryIcon} />
				{item.item}
			</span>,
			<>{item.service}</>,
			<>{dFormat(item.date, "mmm dd, yyyy")}</>,
			<>{item.method}</>,
			<span
				data-type={item.type}
				className="flex justify-end data-[type=revenue]:text-emerald-500"
			>
				{item.type === "revenue" ? (
					<ArrowBigUp />
				) : (
					<ArrowBigDown className="text-zinc-400" />
				)}

				{(Number(item.price) / 100).toLocaleString("pt-BR", {
					style: "currency",
					currency: "BRL",
				})}
			</span>,
		];
		return { id: String(item.id), columns: columns };
	});

	return (
		<main className="p-8">
			<div className="flex items-center justify-between gap-4">
				<Title text="Transações Recentes" />
				<div
					className="flex cursor-pointer items-center gap-2 font-semibold uppercase 
					text-teal-600 transition-all hover:text-teal-500"
					onClick={() => {
						modalContext.open(<ModalTransactionRegister id={"m-register"} />);
					}}
				>
					<Plus /> Adicionar Transação
				</div>
			</div>
			<div>
				<TabList tabList={views} currentTab={currentView} />
				<Table
					header={header}
					rows={rows}
					className="my-4"
					onRowClick={(rowId) => {
						modalContext.open(
							<ModalTransactionEdit id={"m-edit"} sourceId={rowId} />,
						);
					}}
					noResultsMessage="Nenhuma transação encontrada!"
				/>
			</div>
		</main>
	);
}

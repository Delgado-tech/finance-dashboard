"use client";

import { useModalContext } from "@/context/ModalContext";
import { transactions } from "@/mock/transactions.mockup";
import { IDictionary } from "@/types/dictionary";
import { getTransactionTableFormatedData } from "@/utils/transactionTableData";
import { Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
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

	const { header, rows } = getTransactionTableFormatedData(filteredTransactions);

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

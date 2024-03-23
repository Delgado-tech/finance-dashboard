"use client";

import { DateProvider } from "@/context/DateContext";
import { transactions } from "@/mock/transactions.mockup";
import Title from "../atoms/Title";
import ExpensesBreakdown from "../organisms/ExpensesBreakdown";
import ExpensesComparisionChart from "../organisms/chart/ExpensesComparisionChart";

export default function ExpensesTemplate() {
	return (
		<DateProvider>
			<main className="p-8">
				<Title text="Comparação de Despesas" />

				<ExpensesComparisionChart expenses={transactions} dateChanger />

				<Title text="Detalhamento das Despesas" className="pt-6" />

				<ExpensesBreakdown />
			</main>
		</DateProvider>
	);
}

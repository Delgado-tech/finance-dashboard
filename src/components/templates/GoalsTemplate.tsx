"use client";

import { DateProvider } from "@/context/DateContext";
import Title from "../atoms/Title";
import SavingsGoal from "../organisms/SavingsGoal";
import ExpensesComparisionChart from "../organisms/chart/ExpensesComparisionChart";
import { transactions } from "@/mock/transactions.mockup";

export default function GoalsTemplate() {
	return (
		<DateProvider>
			<main className="p-8">
				<Title text="Metas" />
				<div className="flex gap-8 bg-red-500">
					<SavingsGoal />
					<ExpensesComparisionChart
						expenses={transactions}
						chartType="area"
						strokeWidth={2}
						dateChanger
					/>
				</div>
			</main>
		</DateProvider>
	);
}

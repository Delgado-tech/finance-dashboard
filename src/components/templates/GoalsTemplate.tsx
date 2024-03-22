"use client";

import { DateProvider } from "@/context/DateContext";
import Title from "../atoms/Title";
import SavingsGoal from "../organisms/SavingsGoal";

export default function GoalsTemplate() {
	return (
		<DateProvider>
			<main className="p-8">
				<Title text="Metas" />
				<SavingsGoal />
			</main>
		</DateProvider>
	);
}

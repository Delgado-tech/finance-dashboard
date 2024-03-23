import SelectInput from "@/components/molecules/SelectInput";
import TransactionDateChanger from "@/components/molecules/TransactionDateChanger";
import { DateViewMode, useDateContext } from "@/context/DateContext";
import { IMockTransactions } from "@/mock/transactions.mockup";
import { clampClock } from "@/utils/clamp";
import { createExpensesSeriesByViewMode } from "@/utils/createExpensesSeriesByViewMode";
import { expensesDateFilterByViewMode } from "@/utils/expensesDateFilterByViewMode";
import { getMonthNames } from "@/utils/getMonthNames";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import chartComparisionConfig from "./configTemplates/chartComparisionConfig";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
	chartType?: "bar" | "area";
	expenses: IMockTransactions[];
	strokeWidth?: number;
	dateChanger?: boolean;
}

export default function ExpensesComparisionChart({
	chartType = "bar",
	strokeWidth,
	expenses,
	dateChanger = false,
}: Props) {
	const dateContext = useDateContext();
	const [xAxisCategoryNames, setXAxisCategoryNames] = useState<string[]>([""]);

	const setXAxisCategoryNameByMode = (mode: DateViewMode) => {
		let categoryNames: string[] = [];

		if (mode === "year-month") {
			categoryNames = getMonthNames({});
		} else {
			categoryNames = ["Semana 1", "Semana 2", "Semana 3", "Semana 4"];
		}

		setXAxisCategoryNames(categoryNames);
	};

	useEffect(() => {
		if (xAxisCategoryNames.length > 1) return;
		setXAxisCategoryNameByMode(dateContext.dateViewMode);
	}, []);

	const filtredExpenses = expensesDateFilterByViewMode({
		expenses,
		viewMode: dateContext.dateViewMode,
		year: dateContext.year,
		month: dateContext.month,
	});

	const series: number[][] = createExpensesSeriesByViewMode({
		expenses: filtredExpenses,
		xAxisCategoryNames,
		viewMode: dateContext.dateViewMode,
		year: dateContext.year,
		month: dateContext.month,
	});

	const options: ApexCharts.ApexOptions = chartComparisionConfig({
		categories: xAxisCategoryNames,
		chart: {
			type: chartType,
			toolbar: {
				show: false,
			},
		},
		strokeWidth: strokeWidth,
		series: [
			{
				name:
					dateContext.dateViewMode === "year-month"
						? String(dateContext.year - 1)
						: `${getMonthNames({ format: "long" })[clampClock(dateContext.month - 1, 0, 11)]} / ${dateContext.year - 1}`,
				data: series[0],
				color: "#c0c0c0",
			},
			{
				name:
					dateContext.dateViewMode === "year-month"
						? String(dateContext.year)
						: `${getMonthNames({ format: "long" })[dateContext.month]} / ${dateContext.year}`,
				data: series[1],
				color: "#0d9488",
			},
		],
		yaxis: {
			max: (value) => value * 1.25,
			show: filtredExpenses.length > 0,
			labels: {
				formatter: (value) => `R$ ${Math.round(value)}`,
				style: {
					colors: "#8b8b8b",
					fontSize: "0.875rem",
				},
			},
		},
	});

	const comparationType = ["Comparação mensal", "Comparação semanal"];

	const infoDisplay = {
		seriesA:
			dateContext.dateViewMode === "year-month"
				? dateContext.year - 1
				: `${getMonthNames({ format: "long" })[clampClock(dateContext.month - 1, 0, 11)]} ${dateContext.month === 0 ? dateContext.year - 1 : ""}`,
		seriesB:
			dateContext.dateViewMode === "year-month"
				? dateContext.year
				: `${getMonthNames({ format: "long" })[dateContext.month]} ${dateContext.month === 0 ? dateContext.year : ""}`,
	};

	return (
		<div className="w-full rounded-lg bg-white p-4 shadow-sm">
			{dateChanger && <TransactionDateChanger />}
			<div className="flex items-center justify-between gap-4">
				<span className="w-full max-w-[250px]">
					<SelectInput
						id={"comparation-type"}
						options={comparationType}
						actionInputValue={(val) => {
							const mode: DateViewMode =
								val === comparationType[0] ? "year-month" : "month-week";
							dateContext.setDateViewMode(mode);
							setXAxisCategoryNameByMode(mode);
						}}
					/>
				</span>
				<div className="flex select-none gap-4">
					<span className="flex items-center gap-2">
						<span className="block size-4 rounded-sm bg-[#c0c0c0]" />
						{infoDisplay.seriesA}
					</span>
					<span className="flex items-center gap-2">
						<span className="block size-4 rounded-sm bg-teal-600" />
						{infoDisplay.seriesB}
					</span>
				</div>
			</div>

			<Chart
				options={options}
				series={options.series}
				type={options.chart?.type}
				width={"100%"}
				height={300}
			/>
		</div>
	);
}

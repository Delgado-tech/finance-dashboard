import { useDateContext } from "@/context/DateContext";
import { IMockTransactions, transactions } from "@/mock/transactions.mockup";
import { arraySum } from "@/utils/arraySum";
import { expensesDateFilterByViewMode } from "@/utils/expensesDateFilterByViewMode";
import dFormat from "dateformat";
import { ArrowDown, ArrowUp } from "lucide-react";
import DynamicIcon from "../atoms/DynamicIcon";
import Table from "./Table";

interface ICategoryList {
	name?: string;
	icon?: string;
	itens: IMockTransactions[];
}

export default function ExpensesBreakdown() {
	const categoryList: ICategoryList[] = [];

	const dateContext = useDateContext();

	const isItemDateCurrentDate = (item: IMockTransactions): boolean => {
		return dateContext.dateViewMode === "year-month"
			? item.date?.getFullYear() === dateContext.year
			: item.date?.getMonth() === dateContext.month;
	};

	const expenses = expensesDateFilterByViewMode({
		expenses: transactions,
		viewMode: dateContext.dateViewMode,
		year: dateContext.year,
		month: dateContext.month,
	}).sort((a, b) => {
		const categoryA = a.category?.toLowerCase() ?? "";
		const categoryB = b.category?.toLowerCase() ?? "";

		if (categoryA < categoryB) {
			return -1;
		}

		if (categoryA > categoryB) {
			return 1;
		}

		return 0;
	});

	const actualView = dateContext.dateViewMode === "year-month" ? "ano" : "mês";

	const generalValues = { previousValue: 0, currentValue: 0 };

	let lastCategory: string | undefined = "";
	for (let i = 0; i < expenses.length; i++) {
		const item = expenses[i];

		if (isItemDateCurrentDate(item))
			generalValues.currentValue += Number(item.price) / 100;
		else generalValues.previousValue += Number(item.price) / 100;

		if (lastCategory !== item.category) {
			lastCategory = item.category;
			categoryList.push({
				name: item.category,
				icon: item.categoryIcon,
				itens: [],
			});
		}

		categoryList[categoryList.length - 1].itens.push(item);
	}

	const sumPricesAndCalcPercentage = (arr: IMockTransactions[]) => {
		let currentValue = 0;
		let previousValue = 0;

		for (let i = 0; i < arr.length; i++) {
			const item = arr[i];

			if (isItemDateCurrentDate(item)) currentValue += Number(item.price) / 100;
			else previousValue += Number(item.price) / 100;
		}

		if (currentValue === 0 || previousValue === 0) {
			return { currentValue, previousValue, undefined };
		}

		const percentage =
			((currentValue - previousValue) * 100) /
			(previousValue === 0 ? 1 : previousValue);

		return { currentValue, previousValue, percentage };
	};

	return (
		<section className="flex flex-col gap-4">
			<div className="col-span-full flex gap-4 rounded-lg bg-zinc-200 p-4 text-lg text-zinc-600 shadow-md">
				<span>
					{actualView} atual:{" "}
					<span className="font-semibold text-red-500">
						R$ {generalValues.currentValue.toFixed(2)}
					</span>
				</span>
				<span className="select-none text-zinc-300">•</span>
				<span>
					{actualView} anterior:{" "}
					<span className="font-medium">
						R$ {generalValues.previousValue.toFixed(2)}
					</span>
				</span>
			</div>
			<div className="grid grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-4">
				{categoryList.map((category, index) => {
					return (
						<div
							key={index}
							className="group relative cursor-pointer select-none rounded-lg bg-zinc-100 shadow-md transition-all hover:scale-[101%]"
						>
							{/* Hover */}
							<span className="absolute size-full rounded-lg bg-sky-200 opacity-0 transition-all group-hover:opacity-10"></span>

							<div className="flex items-center justify-between gap-8 rounded-t-md bg-zinc-200 p-6">
								<div className="flex items-center gap-4">
									<span className="text-zinc-600">
										<DynamicIcon iconName={category.icon} />
									</span>
									<div className="flex flex-col">
										<span className="text-zinc-600">{category.name}</span>
										<span className="text-lg font-bold text-zinc-800">
											R${" "}
											{arraySum(
												category.itens
													.filter((item) => isItemDateCurrentDate(item))
													.map((item) => Number(item.price) / 100),
											).toFixed(2)}
										</span>
									</div>
								</div>

								{Array.from({ length: 1 }, (_, i) => {
									const percent = sumPricesAndCalcPercentage(category.itens);
									return (
										<div key={i} className="flex flex-col">
											{percent.percentage && (
												<span className="flex items-center gap-2 self-end font-semibold text-zinc-500">
													{Math.round(Math.abs(percent.percentage))}%
													{percent.percentage > 0 ? (
														<ArrowUp className="text-red-500" />
													) : (
														<ArrowDown className="text-emerald-500" />
													)}
												</span>
											)}
											<span className="text-end text-sm text-zinc-400">
												comparado com o último {actualView} (R${" "}
												{percent.previousValue.toFixed(2)})
											</span>
										</div>
									);
								})}
							</div>

							<Table
								className="rounded-t-none py-2 shadow-none"
								rows={category.itens
									.filter((item) => {
										if (dateContext.dateViewMode === "year-month") {
											return item.date?.getFullYear() === dateContext.year;
										} else {
											return item.date?.getMonth() === dateContext.month;
										}
									})
									.sort((a, b) => Number(b.price) - Number(a.price))
									.splice(0, 2)
									.map((item, index) => {
										const formatedPrice = (Number(item.price) / 100).toFixed(2);
										return {
											id: String(index),
											columns: [
												<span>{item.service}</span>,
												<span className="flex flex-col">
													<span>R$ {formatedPrice}</span>
													<span className="text-sm font-normal text-zinc-400">
														{dFormat(item.date, "dd/mm/yyyy")}
													</span>
												</span>,
											],
										};
									})}
							/>
						</div>
					);
				})}
			</div>
		</section>
	);
}

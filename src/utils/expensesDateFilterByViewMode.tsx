import { DateViewMode } from "@/context/DateContext";
import { IMockTransactions } from "@/mock/transactions.mockup";
import { clampClock } from "./clamp";

interface IExpensesDateFilterByviewMode {
	expenses: IMockTransactions[];
	viewMode: DateViewMode;
	year: number;
	month: number;
}

export function expensesDateFilterByViewMode({
	expenses,
	viewMode,
	year,
	month,
}: IExpensesDateFilterByviewMode): IMockTransactions[] {
	const isCurrentOrLastMonth = (
		itemMonth: number | undefined = 0,
		targetMonth: number,
	): boolean => {
		return (
			itemMonth === targetMonth || itemMonth === clampClock(targetMonth - 1, 0, 11)
		);
	};

	const isCurrentOrLastYear = (
		itemYear: number | undefined = 1900,
		targetYear: number,
	): boolean => {
		return itemYear === targetYear || itemYear === targetYear - 1;
	};

	const filtredExpenses = expenses.filter((item) => {
		const itemYear = item.date?.getFullYear();
		const itemMonth = item.date?.getMonth();

		if (item.type === "expenses") {
			if (viewMode === "year-month") {
				if (isCurrentOrLastYear(itemYear, year)) {
					return item;
				}
			} else {
				if (isCurrentOrLastMonth(itemMonth, month)) {
					if (
						itemYear === year ||
						(itemYear === year - 1 && itemMonth === 11 && month === 0)
					) {
						return item;
					}
				}
			}
		}
	});

	return filtredExpenses.sort((a, b) => {
		const getDateValue = (item: IMockTransactions) => {
			return viewMode === "year-month"
				? item.date?.getMonth()
				: item.date?.getDate();
		};

		const valueA = getDateValue(a);
		const valueB = getDateValue(b);

		return Number(valueA) - Number(valueB);
	});
}

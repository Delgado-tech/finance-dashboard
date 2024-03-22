export function getMonthFirstWeekDay(month: number, year: number) {
	return new Date(year, month, 0).getDay() + 1;
}

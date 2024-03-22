export function getDaysInMonth(month: number, year: number) {
	if (month < 0) {
		year--;
		month = 11;
	} else if (month > 11) {
		year++;
		month = 0;
	}

	return new Date(year, month + 1, 0).getDate();
}

interface IOptions {
	format?: "numeric" | "2-digit" | "long" | "short" | "narrow";
}

export function getMonthNames({ format = "short" }: IOptions): string[] {
	const monthNames = Array.from({ length: 12 }, (_, i) => {
		const month = new Date(0, i)
			.toLocaleString(window.navigator.language, { month: format })
			.replace(".", "");

		return month.charAt(0).toUpperCase() + month.slice(1);
	});

	return monthNames;
}

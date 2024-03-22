interface IOptions {
	format?: "long" | "short" | "narrow";
}

export function getDayWeekNames({ format = "short" }: IOptions) {
	const weekNames = Array.from({ length: 7 }, (_, i) => {
		const week = new Date(0, 0, i)
			.toLocaleString(window.navigator.language, { weekday: format })
			.replace(".", "");

		return week;
	});

	return weekNames;
}

import { useDateContext } from "@/context/DateContext";
import { clampClock } from "@/utils/clamp";
import { getMonthNames } from "@/utils/getMonthNames";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {}

export default function TransactionDateChanger({ className }: Props) {
	const dateContext = useDateContext();

	const display =
		dateContext.dateViewMode === "year-month"
			? dateContext.year
			: `${getMonthNames({})[dateContext.month]} ${dateContext.year}`;

	return (
		<div
			className={twMerge(
				"flex items-center justify-center gap-2 pb-4 text-zinc-300",
				className,
			)}
		>
			<ChevronLeft
				className="cursor-pointer select-none"
				onClick={() => {
					if (dateContext.dateViewMode === "year-month") {
						dateContext.setYear((prev) => Math.max(prev - 1, 1900));
					} else {
						if (dateContext.year !== 1900 || dateContext.month !== 11) {
							// diminui o mês, caso o valor do mês diminuido seja -1, quer dizer
							// que o mês se tornará dezembro e o ano deverá ser diminuido em um
							if (dateContext.month - 1 < 0) {
								dateContext.setYear((prev) => Math.max(prev - 1, 1900));
							}
							dateContext.setMonth((prev) => clampClock(prev - 1, 0, 11));
						}
					}
				}}
			/>
			<span className="select-none text-xl font-bold text-teal-500">
				{display}
			</span>
			<ChevronRight
				className="cursor-pointer select-none"
				onClick={() => {
					if (dateContext.dateViewMode === "year-month") {
						dateContext.setYear((prev) => prev + 1);
					} else {
						// aumenta o mês, caso o valor do mês aumentado seja maior que 11, quer dizer
						// que o mês se tornará janeiro e o ano deverá ser aumentado em um
						if (dateContext.month + 1 > 11) {
							dateContext.setYear((prev) => prev + 1);
						}
						dateContext.setMonth((prev) => clampClock(prev + 1, 0, 11));
					}
				}}
			/>
		</div>
	);
}

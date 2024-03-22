"use client";

import { clampClock } from "@/utils/clamp";
import { getDayWeekNames } from "@/utils/getDayWeekNames";
import { getDaysInMonth } from "@/utils/getDaysInMonth";
import { getMonthFirstWeekDay } from "@/utils/getMonthFirstWeekDay";
import { getMonthNames } from "@/utils/getMonthNames";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../atoms/button";
import SelectInput from "./SelectInput";

interface IDate {
	year: number;
	month: number;
	day: number;
}

export default function DatePicker() {
	const currentYear = new Date().getFullYear();
	const currentMonth = new Date().getMonth();
	const currentDay = new Date().getDate();
	const maxYear = currentYear + 5;

	const [isSelectMonthYearView, setIsSelectMonthYearView] =
		useState<boolean>(false);

	const [displayedDate, setDisplayedDate] = useState<IDate>({
		year: currentYear,
		month: currentMonth,
		day: currentDay,
	});

	const [selectedDate, setSelectedDate] = useState<IDate>({ ...displayedDate });

	const [dayWeekNames, setDayWeekNames] = useState<string[]>([]);
	const [monthNames, setMonthNames] = useState<string[]>([]);

	useEffect(() => {
		setDayWeekNames(getDayWeekNames({}));
		setMonthNames(getMonthNames({ format: "long" }));
	}, []);

	const firstWeekDay = getMonthFirstWeekDay(
		displayedDate.month,
		displayedDate.year,
	);

	const monthDayCount = getDaysInMonth(displayedDate.month, displayedDate.year);
	const lastMonthDayCount = getDaysInMonth(
		displayedDate.month - 1,
		displayedDate.year,
	);

	const decrementMonth = () => {
		const month = clampClock(displayedDate.month - 1, 0, 11);
		const year =
			displayedDate.month - 1 < 0 ? displayedDate.year - 1 : displayedDate.year;

		if (year < 1900) return;

		setDisplayedDate((prev) => {
			return { ...prev, year, month };
		});
	};

	const incrementMonth = () => {
		const month = clampClock(displayedDate.month + 1, 0, 11);
		const year =
			displayedDate.month + 1 > 11 ? displayedDate.year + 1 : displayedDate.year;

		if (year > maxYear) return;

		setDisplayedDate((prev) => {
			return { ...prev, year, month };
		});
	};

	const rows = 6;
	let day = 0;
	let otherMonthDay = false;

	return (
		<section className="fixed">
			<div className="relative m-32 w-[clamp(250px,_100%,_600px)] rounded-lg bg-white p-8 font-poppins shadow-md transition-all">
				<div className="flex justify-between gap-8 pb-8">
					<span
						className="flex cursor-pointer select-none items-center gap-1 text-lg font-medium transition-all hover:scale-105 hover:text-teal-500"
						onClick={() => setIsSelectMonthYearView((prev) => !prev)}
					>
						{monthNames[displayedDate.month]} {displayedDate.year}{" "}
						<span
							data-arrow-up={isSelectMonthYearView}
							className="transition-transform data-[arrow-up=true]:rotate-180"
						>
							<ChevronDown />
						</span>
					</span>
					<div className="flex select-none gap-4">
						<ChevronLeft
							className="cursor-pointer text-zinc-700 transition-all hover:scale-110 hover:text-teal-500"
							onClick={() => decrementMonth()}
						/>
						<ChevronRight
							className="cursor-pointer text-zinc-700 transition-all hover:scale-110 hover:text-teal-500"
							onClick={() => incrementMonth()}
						/>
					</div>
				</div>

				<div>
					<div
						data-show={isSelectMonthYearView}
						className="absolute left-0 top-16 flex h-20 w-full gap-2 rounded-b-lg bg-white
                            bg-opacity-90 px-8 py-4 pr-24 shadow-md backdrop-blur-sm transition-all data-[show=false]:hidden data-[show=false]:h-0"
					>
						<SelectInput
							id={"month"}
							label={"Mês"}
							labelColor="bg-white"
							options={monthNames}
							selectedOptionId={displayedDate.month}
							actionInputValue={(_, index) => {
								setDisplayedDate((prev) => {
									return { ...prev, month: index! };
								});
							}}
							defaultOption={displayedDate.month}
						/>
						<SelectInput
							id={"year"}
							label={"Ano"}
							labelColor="bg-white"
							options={Array.from({ length: maxYear - 1899 }).map((_, index) =>
								String(maxYear - index),
							)}
							selectedOptionId={maxYear - displayedDate.year}
							actionInputValue={(_, index) => {
								setDisplayedDate((prev) => {
									return { ...prev, year: maxYear - index! };
								});
							}}
							defaultOption={maxYear - displayedDate.year}
						/>
					</div>
					<table className="w-full bg-white text-center">
						<thead className="select-none [&_th]:px-1 [&_th]:py-2 [&_th]:text-zinc-700">
							<tr>
								{dayWeekNames.map((wd, index) => (
									<th key={index}>{wd}</th>
								))}
							</tr>
						</thead>
						<tbody className="[&_td]:px-2 [&_td]:py-1 [&_td]:text-zinc-600">
							{Array.from({ length: rows }).map((_, row) => {
								return (
									<tr key={row}>
										{dayWeekNames.map((_, wdIndex) => {
											if (row === 0 && wdIndex <= firstWeekDay && firstWeekDay < 7) {
												if (wdIndex < firstWeekDay) {
													day = lastMonthDayCount - (firstWeekDay - wdIndex) + 1;
													otherMonthDay = true;
												} else {
													day = 1;
													otherMonthDay = false;
												}
											} else {
												if (day < monthDayCount) {
													day++;
												} else {
													day = 1;
													otherMonthDay = true;
												}
											}

											return (
												<td key={wdIndex}>
													<span className="flex justify-center">
														<span
															data-other-month-day={otherMonthDay}
															data-day={day}
															data-selected={
																!otherMonthDay &&
																selectedDate.year === displayedDate.year &&
																selectedDate.month === displayedDate.month &&
																selectedDate.day === day
															}
															className="flex size-10 select-none items-center justify-center rounded-full transition-all 
																data-[other-month-day=false]:cursor-pointer data-[selected=true]:bg-teal-500
																data-[other-month-day=true]:text-zinc-400
																data-[selected=true]:text-white 
																data-[selected=false]:data-[other-month-day=false]:hover:bg-zinc-200"
															onClick={(event) => {
																const target = event.target as HTMLElement;

																if (target.dataset.otherMonthDay === "false") {
																	setSelectedDate({
																		year: displayedDate.year,
																		month: displayedDate.month,
																		day: Number(target.dataset.day),
																	});
																}
															}}
														>
															{day}
														</span>
													</span>
												</td>
											);
										})}
									</tr>
								);
							})}
						</tbody>
					</table>
					<div className="mt-8 flex gap-4 pl-32">
						<Button.Root>
							<Button.Content text={"Cancelar"} />
						</Button.Root>
						<Button.Root className="bg-teal-500 hover:bg-teal-400">
							<Button.Content text={"Aplicar"} className="text-white" />
						</Button.Root>
					</div>
				</div>
			</div>
		</section>
	);
}

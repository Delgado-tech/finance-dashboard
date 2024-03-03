import React, { createContext, useContext, useState } from "react";

export type DateViewMode = "year-month" | "month-week";

interface IDateContext {
	year: number;
	month: number;
	dateViewMode: DateViewMode;
	setYear: React.Dispatch<React.SetStateAction<number>>;
	setMonth: React.Dispatch<React.SetStateAction<number>>;
	setDateViewMode: React.Dispatch<React.SetStateAction<DateViewMode>>;
}

interface Props {
	children?: React.ReactNode;
}

const DateContext = createContext<IDateContext | undefined>(undefined);

export function DateProvider({ children }: Props) {
	const [year, setYear] = useState<number>(new Date().getFullYear());
	const [month, setMonth] = useState<number>(new Date().getMonth());
	const [dateViewMode, setDateViewMode] = useState<DateViewMode>("year-month");

	const contextValue: IDateContext = {
		year,
		month,
		dateViewMode,
		setYear,
		setMonth,
		setDateViewMode,
	};

	return (
		<DateContext.Provider value={contextValue}>{children}</DateContext.Provider>
	);
}

export function useDateContext() {
	const context = useContext(DateContext);
	if (!context) {
		throw new Error("useDate deve ser usado dentro de um DateProvider");
	}
	return context;
}
